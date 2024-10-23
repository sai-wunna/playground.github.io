"use strict";

import _ from "./dom/index.js";
import validator from "./validator/index.js";
import notifier from "./notify.js";
import { lockBtn } from "./helpers/lockBtn.js";
import { removeRelevantCusStyles } from "./stylesHelpers/customStyles.js";
import createStyleInfoBox from "./stylesHelpers/styleInfoBoxes.js";

const high_light_ele = _.getNodeById("high_light_ele");
const element_pointer = _.getNodeById("element_pointer");
const appNode = _.getNode(".app-node");
const isInsertBefore = _.getNodeById("beforeOrAfter");
const childrenStackWrapper = _.getNodeById("children_c");

let selectedNode = "#app";
let selectedTreeNode = "#children";

_.on("click", appNode, (e) => {
	e.preventDefault();
	lockBtn(appNode);
	setSelectedNodeStyle(appNode);
	selectAppNode();
});

_.on("change", high_light_ele, (e) => {
	e.preventDefault();
	if (high_light_ele.checked) {
		pointOutTheEle(selectedNode);
	} else {
		removePointOutTheEle();
	}
});
// handle all select and remove event by the parent wrapper
_.on(
	"click",
	childrenStackWrapper,
	(e) => {
		e.preventDefault();
		e.stopPropagation(); // stop evt bubbling
		lockBtn(e.target);
		const id = e.target.id;
		if (!id) return;
		if (!id.startsWith("btn")) return;
		const nodeId = `#${id.slice(6)}`;
		if (id.startsWith("btn_d")) {
			removeNode(e.target, nodeId);
			return;
		}
		selectNode(e.target, nodeId);
	},
	true
);

function addTableStack(tableId, thData, tbData, tfData) {
	function createTRNode(data, trId) {
		const fragment = _.createFragment();
		data.forEach((one) => {
			let text = one.text || one.heading || "td";
			fragment.appendChild(
				_.createButton(
					text.slice(0, 5),
					["stack-node"],
					`btn_s_${one.id}`
				)
			);
		});
		return _.createElement(
			"div",
			"",
			["stack-node-box"],
			[
				_.createButton("tr", ["stack-node"], `btn_s_${trId}`),
				_.createElement("div", "", ["stack-node-box"], [fragment]),
			]
		);
	}
	const tableHeader = _.createElement(
		"div",
		"",
		["stack-node-box"],
		[
			_.createButton("tHead", ["stack-node"], `btn_s_${thData.thId}`),
			createTRNode(thData.data, thData.trId),
		]
	);
	const tableFooter = _.createElement(
		"div",
		"",
		["stack-node-box"],
		[
			_.createButton("tFoot", ["stack-node"], `btn_s_${tfData.tfId}`),
			createTRNode(tfData.data, tfData.trId),
		]
	);
	const bodyDataFragment = _.createFragment();
	tbData.data.forEach((data) => {
		bodyDataFragment.appendChild(createTRNode(data.data, data.trId));
	});
	const tableBody = _.createElement(
		"div",
		"",
		["stack-node-box"],
		[
			_.createButton("tBody", ["stack-node"], `btn_s_${tbData.tbId}`),
			bodyDataFragment,
		]
	);
	const tableStacks = _.createElement(
		"div",
		"",
		["stack-node-box"],
		[tableHeader, tableBody, tableFooter],
		`${tableId}_c`
	);
	tableStacks.style.backgroundColor = "rgba(0, 0, 0, 0.109)";
	const tableNode = _.createElement(
		"div",
		"",
		["stack-node-box"],
		[
			_.createButton("table", ["stack-node"], `btn_s_${tableId}`),
			_.createButton(
				"Del",
				["stack-node-delete", "text-danger"],
				`btn_d_${tableId}`
			),
			tableStacks,
		]
	);
	addToStackTree(tableNode);
	pointOutTheEle(selectedNode);
}

function addListStack(type, id, lists) {
	const listItemNode = _.createFragment();
	lists.forEach((item) => {
		listItemNode.appendChild(createTreeNode(item.id, "list item"));
	});
	const listNode = createTreeNode(
		id,
		type === "ol" ? "Ordered List" : "Unordered List",
		listItemNode
	);
	addToStackTree(listNode);
	pointOutTheEle(selectedNode);
}

function addSelectionStack(selectId, options) {
	function createOption(text, id) {
		return _.createElement(
			"div",
			"",
			["stack-node-box"],
			[
				_.createButton(text, ["stack-node"], `btn_s_${id}`),
				_.createButton(
					"Del",
					["stack-node-delete", "text-danger"],
					`btn_d_${id}`
				),
			]
		);
	}
	const optionFragment = _.createFragment();
	options.forEach((option) => {
		optionFragment.appendChild(createOption(option.text, option.id));
	});
	const selectionNode = createTreeNode(selectId, "Select", optionFragment);

	addToStackTree(selectionNode);
	pointOutTheEle(selectedNode);
}

function addFigureStack(stacksArr) {
	const fragment = _.createFragment();
	for (let i = 2; i < stacksArr.length; i += 2) {
		fragment.appendChild(createTreeNode(stacksArr[i], stacksArr[i + 1]));
	}
	const newStack = createTreeNode(stacksArr[0], stacksArr[1], fragment);
	addToStackTree(newStack);
	pointOutTheEle(selectedNode);
}

function addNewStack(id, name) {
	const newStack = createTreeNode(id, name);
	addToStackTree(newStack);
	pointOutTheEle(selectedNode);
}

function addToStackTree(ele) {
	if (isInsertBefore.checked && selectedNode !== "#app") {
		_.getNode(
			`${selectedTreeNode}_c`
		).parentElement.parentElement.insertBefore(
			ele,
			_.getNode(`${selectedTreeNode}_c`).parentElement
		);
	} else {
		_.getNode(`${selectedTreeNode}_c`).appendChild(ele);
	}
}

function createTreeNode(id, name, children) {
	const childrenBox = _.createElement("div", "", [], [], `${id}_c`);
	if (children) {
		childrenBox.appendChild(children);
	}
	childrenBox.style.backgroundColor = "rgba(0, 0, 0, 0.109)";
	return _.createElement(
		"div",
		"",
		["stack-node-box"],
		[
			_.createButton(name, ["stack-node"], `btn_s_${id}`),
			_.createButton(
				"Del",
				["stack-node-delete", "text-danger"],
				`btn_d_${id}`
			),
			childrenBox,
		]
	);
}

function selectNode(controllerNode, id) {
	if (id === selectedNode) return;
	pointOutTheEle(id);
	selectedNode = selectedTreeNode = id;
	showTargetEleId(id);
	createStyleInfoBox.targetStyleInfoBox(id);
	setSelectedNodeStyle(controllerNode);
}

function removeNode(controllerNode, id) {
	const target = _.getNode(id);
	removeRelevantCusStyles(target); // take ids to remove relevant custom styles
	target.remove();
	controllerNode.parentElement.remove();
	if (id === selectedNode || !_.getNode(selectedNode)) {
		selectAppNode();
	} else {
		pointOutTheEle(selectedNode);
	}
}

function setSelectedNodeStyle(node) {
	_.getNode(".selected-node")?.classList.remove("selected-node");
	node.classList.add("selected-node");
}

function selectAppNode() {
	removePointOutTheEle();
	if ("#app" === selectedNode) return;
	_.getNode(".app-node").classList.add("selected-node");
	showTargetEleId("#app");
	selectedNode = "#app";
	selectedTreeNode = "#children";
	createStyleInfoBox.targetStyleInfoBox("#app");
}

function showTargetEleId(target) {
	_.getNodeById("selected_ele_shower").textContent = target;
	_.getNodeById("styling_ele_shower").textContent = target;
	_.getNodeById("edit_ele_shower").textContent = target;
}

function pointOutTheEle(ele) {
	if (!high_light_ele.checked) return;
	let element;
	if (ele && typeof ele !== "object") {
		if (validator.isInvalidEleToShow(ele)) {
			notifier.on("hidden");
			removePointOutTheEle();
			return;
		}
		element = _.getNode(ele) || _.getNodeById("app");
	} else {
		element = ele;
	}

	if (!element) {
		return;
	}
	const rect = element.getBoundingClientRect();
	const scrollLeft = document.documentElement.scrollLeft;
	const scrollTop = document.documentElement.scrollTop;

	const left = rect.left + scrollLeft;
	const top = rect.top + scrollTop;

	element_pointer.style.width = rect.width + "px";
	element_pointer.style.height = rect.height + "px";
	element_pointer.style.left = left + "px";
	element_pointer.style.top = top + "px";
	element_pointer.style.display = "block";
}

function removePointOutTheEle() {
	element_pointer.style.display = "none";
}

export {
	selectNode,
	removeNode,
	addNewStack,
	addTableStack,
	addSelectionStack,
	addListStack,
	addFigureStack,
	pointOutTheEle,
	selectedNode,
	isInsertBefore,
};

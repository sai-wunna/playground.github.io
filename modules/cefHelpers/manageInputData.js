'use strict'

function manageListData(lists) {
  const newList = []
  lists.forEach((list, index) => {
    newList.push({ text: list, id: `li_${new Date().getTime() + index}` })
  })
  return newList
}

//  this function helps to adjust data to suit with (createTable * under construction) function
function manageTData(hData, bData, fData) {
  const thData = []
  const tbData = []
  let tbDataSet = []
  const tfData = []
  hData.forEach((data, index) => {
    const id = `th_${new Date().getTime() + index}`
    thData.push({ heading: data || '', id })
  })
  const cellLimit = hData.length
  const lastOne = bData.length - 1
  bData.forEach((data, index) => {
    const id = `td_${new Date().getTime() + index}`
    tbDataSet.push({ text: data || '', id })
    if (tbDataSet.length === cellLimit || index === lastOne) {
      tbData.push({
        data: tbDataSet,
        trId: `tr_${new Date().getTime() + index}`,
      })
      tbDataSet = []
    }
  })
  fData.forEach((data, index) => {
    const id = `tf_${new Date().getTime() + index}`
    tfData.push({ text: data || '', id })
  })
  return [
    {
      data: thData,
      thId: `thead_${new Date().getTime()}`,
      trId: `tr_${new Date().getTime()}`,
    },
    { data: tbData, tbId: `tbody_${new Date().getTime()}` },
    {
      data: tfData,
      tfId: `tfoot_${new Date().getTime()}`,
      trId: `tr_${new Date().getTime()}`,
    },
  ]
}

function manageSelectData(options, values) {
  return options.map((option, index) => {
    return {
      id: `option_${new Date().getTime() + index}`,
      text: option,
      value: values[index],
    }
  })
}

export { manageListData, manageTData, manageSelectData }

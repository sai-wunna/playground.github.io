import Document from '../../dom/index.js'

const _ = Document()

function calMNPSideValue(side, baseKey, value) {
  // y-axis-a 0-auto-x-axis
  let key
  let newValue
  if (side) {
    if (side.includes('center')) {
      key = baseKey
      if (side === 'v_center') {
        newValue = `${value} auto`
      } else {
        newValue = `0 auto ${value}`
      }
    } else {
      key = `${baseKey}-${side}`
      newValue = value
    }
  } else {
    key = baseKey
    newValue = value
  }
  return [key, newValue]
}

function calTextDecoration(type, color) {
  let value
  if (type === 'dotted') {
    value = `underline dotted ${color}`
  } else {
    value = `${color} wavy underline`
  }
  return value
}

function calGrdValue() {
  const type = _.getNode('#cs_bg_type').value

  const colors = []
  _.getAllNodes('.bg-grd-color').forEach((cNode) => {
    colors.push(cNode.value)
  })
  if (type === 'linear') {
    return `linear-gradient(${_.getNode('#cs_grd_deg').value}deg, ${colors.join(
      ','
    )})`
  } else {
    return `radial-gradient(${colors.join(',')})`
  }
}

function manageBOO(baseKey, side, type, value, color) {
  let key
  if (!side || ['ridge', 'double'].includes(type) || baseKey === 'outline') {
    key = baseKey
  } else {
    key = `${baseKey}-${side}`
  }
  return [key, `${value} ${type} ${color}`]
}

function calTransitionValues() {
  const prdNodes = _.getAllNodes('.cs-trans-prd')
  const efNodes = _.getAllNodes('.cs-trans-ef')
  let value = ''
  _.getAllNodes('.cs-trans-name').forEach((one, idx) => {
    value += ` ${one.value} ${prdNodes[idx].value / 10}s ${
      efNodes[idx].value
    } ${idx < prdNodes.length - 1 ? ',' : ''}`
  })
  return value
}

function calBoxShadowValue() {
  let value = ''
  const xoNodes = _.getAllNodes('.cs-bs-xo')
  const yoNodes = _.getAllNodes('.cs-bs-yo')
  const bNodes = _.getAllNodes('.cs-bs-blur')
  const sNodes = _.getAllNodes('.cs-bs-spr')
  const cNodes = _.getAllNodes('.cs-bs-color')
  const aNodes = _.getAllNodes('.cs-bs-alpha')
  _.getAllNodes('.cs-bs-type').forEach((one, idx) => {
    value += `${one.value} ${xoNodes[idx].value}px ${yoNodes[idx].value}px ${
      bNodes[idx].value
    }px ${sNodes[idx].value}px rgba(${hexToRgb(cNodes[idx].value)},${
      Math.min(Math.max(aNodes[idx].value, 1), 10) / 10
    }) ${idx < xoNodes.length - 1 ? ',' : ''}`
  })

  return value
}

function calTextShadowValue() {
  let value = ''
  const yoNodes = _.getAllNodes('.cs-ts-yo')
  const bNodes = _.getAllNodes('.cs-ts-blur')
  const cNodes = _.getAllNodes('.cs-ts-color')
  const aNodes = _.getAllNodes('.cs-ts-alpha')
  _.getAllNodes('.cs-ts-xo').forEach((one, idx) => {
    value += `${one.value}px ${yoNodes[idx].value}px ${
      bNodes[idx].value
    }px rgba(${hexToRgb(cNodes[idx].value)},${
      Math.min(Math.max(aNodes[idx].value, 1), 10) / 10
    }) ${idx < yoNodes.length - 1 ? ',' : ''}`
  })
  return value
}

function calTransformValue(transformList) {
  const unit = _.getNode('#unit_selector').value
  let value = ''
  if (transformList.includes('translate')) {
    const values = []
    _.getAllNodes('.cs-trans-translate-value').forEach((one) => {
      values.push(parseInt(one.value))
    })
    value += `translate(${values[0]}${unit}, ${values[1]}${unit}) `
  }
  if (transformList.includes('rotate')) {
    value += `rotate(${parseInt(
      _.getNode('.cs-trans-rotate-value').value
    )}deg) `
  }
  if (transformList.includes('scale')) {
    const values = []
    _.getAllNodes('.cs-trans-scale-value').forEach((one) => {
      values.push(one.value)
    })
    value += `scale(${values[0]}, ${values[1]}) `
  }
  if (transformList.includes('skew')) {
    const values = []
    _.getAllNodes('.cs-trans-skew-value').forEach((one) => {
      values.push(parseInt(one.value))
    })
    value += `skew(${values[0]}deg, ${values[1]}deg) `
  }
  if (transformList.includes('perspective')) {
    value += `perspective(${parseInt(
      _.getNode('.cs-trans-pov-value').value
    )}${unit}) `
  }
  if (transformList.includes('translate3d')) {
    const values = []
    _.getAllNodes('.cs-trans-translate3d-value').forEach((one) => {
      values.push(parseInt(one.value))
    })
    value += `translate3d(${values[0]}${unit}, ${values[1]}${unit}, ${values[2]}${unit}) `
  }
  if (transformList.includes('rotate3d')) {
    const values = []
    _.getAllNodes('.cs-trans-rotate3d-value').forEach((one) => {
      values.push(parseInt(one.value))
    })
    value += `rotate3d(${values[0]}${unit}, ${values[1]}${unit}, ${values[2]}${unit})`
  }
  return value
}

function calAniTimeLineValue() {
  let value
  const valuesInput = _.getAllNodes('.ani-tl-view-arg-value')
  const values = [valuesInput[0].value, valuesInput[1].value]
  const type = _.getNode('#cs_ani_timeline_view').value
  const unit = _.getNode('#unit_selector').value
  if (type.startsWith('v_')) {
    if (type === 'v_single_inset') {
      value = `${values[0]}${unit}`
    } else if (type === 'v_double_inset') {
      value = `${values[0]}${unit} ${values[1]}${unit}`
    } else if (type === 'v_block_double_inset') {
      value = `block ${values[0]}${unit} ${values[1]}${unit}`
    } else if (type === 'v_x_custom_auto') {
      value = `x ${values[0]}${unit} auto`
    } else if (type === 'v_auto_custom') {
      value = `auto ${values[0]}${unit}`
    } else {
      value = `inline ${values[0]}${unit}`
    }
  } else {
    value = type
  }
  return `view(${value})`
}

function calAnimationValue() {
  let value = ''
  const duration = parseInt(_.getNode('#cs_ani_duration').value)
  if (duration) {
    value += `${duration / 10}s `
  }
  const timingFn = _.getNode('#cs_ani_timing_fn').value
  if (timingFn) {
    value += `${timingFn} `
  }
  const delayTime = parseInt(_.getNode('#cs_ani_delay').value)
  if (delayTime) {
    value += `${delayTime}s `
  }
  const iterationCount = _.getNode('#cs_ani_itr_count').value
  if (iterationCount) {
    value += `${iterationCount} `
  }
  const direction = _.getNode('#cs_ani_direction').value
  if (direction) {
    value += `${direction} `
  }
  const fillNode = _.getNode('#cs_ani_fill_mode').value
  if (fillNode) {
    value += `${fillNode} `
  }
  return value
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '')

  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return `${r}, ${g}, ${b}`
}

export {
  calMNPSideValue,
  calTextDecoration,
  calGrdValue,
  manageBOO,
  calTransitionValues,
  calBoxShadowValue,
  calTextShadowValue,
  calTransformValue,
  calAnimationValue,
  calAniTimeLineValue,
  hexToRgb,
}

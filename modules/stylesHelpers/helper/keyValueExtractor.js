'use strict'

class KeyValueExtractor {
  constructor(doc, unitOne, unitTwo, unitThree, unitFour) {
    this.unitOne = unitOne
    this.unitTwo = unitTwo
    this.unitThree = unitThree
    this.unitFour = unitFour
    this._ = doc
  }

  calMarginValue(side, value) {
    // y-axis-a 0-auto-x-axis
    let key = 'margin'
    let newValue
    if (side) {
      if (side.includes('center')) {
        if (side === 'v_center') {
          newValue = `${value} auto`
        } else {
          newValue = `0 auto ${value}`
        }
      } else {
        key += `-${side}`
        newValue = value
      }
    } else {
      newValue = value
    }
    return [key, newValue]
  }

  calPaddingValue(side, value) {
    let key = 'padding'
    let newValue
    if (side) {
      if (side.includes('0')) {
        if (side === '0-x') {
          newValue = `0 ${value}`
        } else {
          newValue = `${value} 0`
        }
      } else {
        key += `-${side}`
        newValue = value
      }
    } else {
      newValue = value
    }
    return [key, newValue]
  }

  calTextDecoration(type, color) {
    let value
    if (type === 'dotted') {
      value = `underline dotted ${color}`
    } else {
      value = `${color} wavy underline`
    }
    return value
  }

  calGrdValue(type, colorNodes, deg) {
    const colors = []
    colorNodes.forEach((cNode) => {
      colors.push(cNode.value)
    })
    if (type === 'linear') {
      return `linear-gradient(${deg}deg, ${colors.join(',')})`
    } else {
      return `radial-gradient(${colors.join(',')})`
    }
  }

  manageBOO(baseKey, side, type, value, color) {
    let key
    if (!side || ['ridge', 'double'].includes(type) || baseKey === 'outline') {
      key = baseKey
    } else {
      key = `${baseKey}-${side}`
    }
    return [key, `${value} ${type} ${color}`]
  }

  calTransitionValues(prdNodes, efNodes) {
    let value = ''
    this._.getAllNodes('.cs-trans-name').forEach((name, idx) => {
      value += ` ${name.value} ${prdNodes[idx].value / 10}s ${
        efNodes[idx].value
      } ${idx < prdNodes.length - 1 ? ',' : ''}`
    })
    return value
  }

  calBoxShadowValue() {
    let value = ''
    const xoNodes = this._.getAllNodes('.cs-bs-xo')
    const yoNodes = this._.getAllNodes('.cs-bs-yo')
    const bNodes = this._.getAllNodes('.cs-bs-blur')
    const sNodes = this._.getAllNodes('.cs-bs-spr')
    const cNodes = this._.getAllNodes('.cs-bs-color')
    const aNodes = this._.getAllNodes('.cs-bs-alpha')
    this._.getAllNodes('.cs-bs-type').forEach((one, idx) => {
      value += `${one.value} ${xoNodes[idx].value}px ${yoNodes[idx].value}px ${
        bNodes[idx].value
      }px ${sNodes[idx].value}px rgba(${this.hexToRgb(cNodes[idx].value)},${
        Math.min(Math.max(aNodes[idx].value, 1), 10) / 10
      }) ${idx < xoNodes.length - 1 ? ',' : ''}`
    })

    return value
  }

  calTextShadowValue() {
    let value = ''
    const yoNodes = this._.getAllNodes('.cs-ts-yo')
    const bNodes = this._.getAllNodes('.cs-ts-blur')
    const cNodes = this._.getAllNodes('.cs-ts-color')
    const aNodes = this._.getAllNodes('.cs-ts-alpha')
    this._.getAllNodes('.cs-ts-xo').forEach((one, idx) => {
      value += `${one.value}px ${yoNodes[idx].value}px ${
        bNodes[idx].value
      }px rgba(${this.hexToRgb(cNodes[idx].value)},${
        Math.min(Math.max(aNodes[idx].value, 1), 10) / 10
      }) ${idx < yoNodes.length - 1 ? ',' : ''}`
    })
    return value
  }

  calTransformValue(transformList) {
    let value = ''
    if (transformList.includes('translate')) {
      const values = []
      this._.getAllNodes('.cs-trans-translate-value').forEach((one) => {
        values.push(parseInt(one.value))
      })
      value += `translate(${values[0]}${this.unitOne.value}, ${values[1]}${this.unitTwo.value}) `
    }
    if (transformList.includes('rotate')) {
      value += `rotate(${parseInt(
        this._.getNode('.cs-trans-rotate-value').value
      )}deg) `
    }
    if (transformList.includes('scale')) {
      const values = []
      this._.getAllNodes('.cs-trans-scale-value').forEach((one) => {
        values.push(one.value)
      })
      value += `scale(${values[0]}, ${values[1]}) `
    }
    if (transformList.includes('skew')) {
      const values = []
      this._.getAllNodes('.cs-trans-skew-value').forEach((one) => {
        values.push(parseInt(one.value))
      })
      value += `skew(${values[0]}deg, ${values[1]}deg) `
    }
    if (transformList.includes('perspective')) {
      value += `perspective(${parseInt(
        this._.getNode('.cs-trans-pov-value').value
      )}${this.unitOne.value}) `
    }
    if (transformList.includes('translate3d')) {
      const values = []
      this._.getAllNodes('.cs-trans-translate3d-value').forEach((one) => {
        values.push(parseInt(one.value))
      })
      value += `translate3d(${values[0]}${this.unitOne.value}, ${values[1]}${this.unitTwo.value}, ${values[2]}${this.unitThree.value}) `
    }
    if (transformList.includes('rotate3d')) {
      const values = []
      this._.getAllNodes('.cs-trans-rotate3d-value').forEach((one) => {
        values.push(parseInt(one.value))
      })
      value += `rotate3d(${values[0]}${this.unitOne.value}, ${values[1]}${this.unitTwo.value}, ${values[2]}${this.unitThree.value})`
    }
    return value
  }

  calAniTimeLineValue() {
    let value
    const valuesInput = this._.getAllNodes('.ani-tl-view-arg-value')
    const values = [valuesInput[0].value, valuesInput[1].value]
    const type = this._.getNodeById('cs_ani_timeline_view').value
    const unit = this._.getNodeById('unit_selector').value
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

  calAnimationValue() {
    let value = ''
    const duration = parseInt(this._.getNodeById('cs_ani_duration').value)
    if (duration) {
      value += `${duration / 10}s `
    }
    const timingFn = this._.getNodeById('cs_ani_timing_fn').value
    if (timingFn) {
      value += `${timingFn} `
    }
    const delayTime = parseInt(this._.getNodeById('cs_ani_delay').value)
    if (delayTime) {
      value += `${delayTime}s `
    }
    const iterationCount = this._.getNodeById('cs_ani_itr_count').value
    if (iterationCount) {
      value += `${iterationCount} `
    }
    const direction = this._.getNodeById('cs_ani_direction').value
    if (direction) {
      value += `${direction} `
    }
    const fillNode = this._.getNodeById('cs_ani_fill_mode').value
    if (fillNode) {
      value += `${fillNode} `
    }
    return value
  }

  calGapValue(gy, gx) {
    if (gx === gy) {
      return `${gy}${this.unitOne.value}`
    } else {
      return `${gy || 0}${this.unitOne.value} ${gx || 0}${this.unitTwo.value}`
    }
  }

  calMinimizeFourInputs(i1, i2, i3, i4) {
    if (i1 === i2 && i1 === i3 && i1 === i4) {
      return `${i1}${this.unitOne.value}`
    } else if (i1 === i3 && i2 === i4) {
      return `${i1}${this.unitOne.value} ${i2}${this.unitTwo.value}`
    } else {
      return `${i1}${this.unitOne.value} ${i2}${this.unitTwo.value} ${i3}${this.unitThree.value} ${i4}${this.unitFour.value}`
    }
  }

  hexToRgb(hex) {
    hex = hex.replace(/^#/, '')

    const bigint = parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `${r}, ${g}, ${b}`
  }
}

export default KeyValueExtractor

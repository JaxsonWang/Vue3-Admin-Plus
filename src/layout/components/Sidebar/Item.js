import { defineComponent } from 'vue'
import './Item.scss'

export default defineComponent({
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h) {
    const vNodes = []
    if (this.icon) {
      if (this.icon.includes('el-icon')) {
        vNodes.push(<i class={[this.icon, 'sub-el-icon']} />)
      } else {
        vNodes.push(<svg-icon icon-class={this.icon} />)
      }
    }

    if (this.title) {
      vNodes.push(<span slot='title'>{(this.title)}</span>)
    }

    return vNodes
  }
})

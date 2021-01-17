import { defineComponent, toRefs } from 'vue'
import './Item.scss'

export default defineComponent({
  name: 'MenuItem',
  setup(props) {
    const { icon, title } = toRefs(props)

    const vNodes = []
    if (icon) {
      if (icon.includes('el-icon')) {
        vNodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vNodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vNodes.push(<span slot='title'>{(title)}</span>)
    }

    return vNodes
  }
})

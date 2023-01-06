import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { h } from 'vue';
vSelect.props.components.default = () => ({
    Deselect: {
        render: () => h('i', { class: "far fa-times" }, ""),
    },
    OpenIndicator: {
        render: () => h('i', { class: "far fa-angle-down relative top-px right-px" }, ""),
    },
});

export default vSelect
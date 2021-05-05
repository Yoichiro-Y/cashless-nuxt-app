<script>
import { defineComponent, onMounted, SetupContext } from '@vue/composition-api'

export default defineComponent({
    setup(_props, SetupContext) {
    onMounted(() => {
        const pathName = window.location.pathname
        context.root.$nuxt.$router.push('/redirect?path=' + encodeURI(pathName))
    })
    }
})
</script>
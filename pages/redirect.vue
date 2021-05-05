<script>
    import { defineComponent } from '@vue/composition-api'
    
    export default defineComponent({
      layout: 'empty',
      asyncData({ base, redirect, query }) {
        const param = query.path
        if (param === undefined || typeof param !== 'string') {
          return redirect('/')
        }
        const redirectPath = '/' + param.replace(base, '')
        return redirect(redirectPath)
      }
    })
</script>
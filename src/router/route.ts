import type{RouteRecordRaw} from 'vue-router'

import main from '../views/main.vue'

const routes:RouteRecordRaw[] = [
    {
        path:'/',
        component:main,
        name:'main'
    },{
        path:'/setting',
        name:'setting',
        component:() => import('../views/setting.vue')
    }
]

export default routes
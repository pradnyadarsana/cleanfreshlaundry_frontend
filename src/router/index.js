import Vue from 'vue' 
import Router from 'vue-router' 
 
const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue') 
 
function loadView(view) { 
    return () => import(/* webpackChunkName: "view[request]" */ `../components/dashboardContents/${view}.vue`) 
} 
 
const routes = [     
    {       
        path: '/',       
        component: DashboardLayout,       
        children: [ 
            {           
                name: 'LandingPage',           
                path: '',           
                component: loadView('landingPage')         
            },        
            {           
                name: 'UserController',           
                path: '/user',           
                component: loadView('userController')         
            },
            {           
                name: 'BranchController',           
                path: '/branch',           
                component: loadView('branchController')         
            }         
        ]     
    },   
]   

Vue.use(Router) 
 
const router = new Router({mode: 'history', routes: routes}) 
 
export default router 
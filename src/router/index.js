import Vue from 'vue' 
import Router from 'vue-router' 
 
const LandingLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/landingLayout.vue')
const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue') 

function loadLandingView(view) { 
    return () => import(/* webpackChunkName: "view[request]" */ `../components/landingContents/${view}.vue`) 
}

function loadUserView(view) { 
    return () => import(/* webpackChunkName: "view[request]" */ `../components/dashboardContents/${view}.vue`) 
} 

 
const routes = [     
    {       
        path: '/',       
        component: LandingLayout,       
        children: [
            {           
                name: 'LoginPage',           
                path: '',           
                component: loadLandingView('loginPage')         
            }, 
            {           
                name: 'RegisterPage',           
                path: '/register',           
                component: loadLandingView('registerPage')         
            },
        ]     
    },
    {       
        path: '/dashboard',       
        component: DashboardLayout,       
        children: [ 
            {           
                name: 'LandingPage',           
                path: '/',           
                component: loadUserView('landingPage')         
            },        
            {           
                name: 'UserController',           
                path: '/dashboard/user',           
                component: loadUserView('userController')         
            },
            {           
                name: 'BranchController',           
                path: '/dashboard/branch',           
                component: loadUserView('branchController')         
            }         
        ]     
    },   
]   

Vue.use(Router) 
 
const router = new Router({mode: 'history', routes: routes}) 
 
export default router 
<template>
    <div>
        <v-navigation-drawer v-model="drawer" class="primary_dark" dark app clipped fixed temporary>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Modul 11
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Vue Consume REST API
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block color="error">Logout</v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar dark app fixed clipped-left height="70px" color="primary_dark darken-1">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="ml-3"></v-app-bar-nav-icon>

            <VSpacer />
            <v-toolbar-title style="font-size: 21px;" class="white--text">
                CLEAN FRESH LAUNDRY
            </v-toolbar-title>
            <img src="../assets/laundrylogo.png" style="height:45px;width:45px" class="ml-4 mr-6">
        </v-app-bar>

        <VContent>
            <router-view/>
        </VContent>
    </div>
</template>
 
<script>   
export default {
    data() {
        return {
            drawer: null,
            items: [
                {
                    path: '/user/order',
                    title: 'My Order',
                    icon: 'mdi-human-male'
                },
                {
                    path: '/dashboard/user',
                    title: 'User Controller',
                    icon: 'mdi-human-male'
                },
                {
                    path: '/dashboard/branch',
                    title: 'Branch Controller',
                    icon: 'mdi-human-male'
                },
            ],
        }
    },
}
</script> 
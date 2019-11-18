<template>
    <div>
        <v-app-bar app fixed clipped-left height="70px" color="primary">
            <img src="../assets/laundrylogo.png" style="height:45px;width:45px" class="ml-5">
            <v-toolbar-title style="font-size: 21px;" class="secondary--text ml-3">
                CLEAN FRESH LAUNDRY
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-title style="font-size: 21px;" class="secondary--text mr-3">
                EMPLOYEE EDITION
            </v-toolbar-title>
        </v-app-bar>
        

        <template>
            <section class="mt-10">
                <v-parallax :src="require('../assets/employeeloginbg.jpg')" height="715">
                    <v-layout column align-center justify-center class="white--text mt-10">
                        <v-row class="mt-10">
                            <v-col cols="7" class="mt-10">
                                <h1 class="white--text mb-2 mt-10 display-1 text-xs-center"
                                    style="font-weight: 900; text-shadow: 3px 2px #000000">The best laundry in the world
                                </h1>
                                <div class="white--text subheading mb-3 text-xs-center"
                                    style="font-weight: 900; text-shadow: 2px 2px #000000">Unlesh your creativity
                                    without limitations</div>
                            </v-col>
                            <v-col cols="5" class="mt-10">
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Employee Login</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>

                                                <v-col cols="12">
                                                    <v-text-field label="Username" required></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field label="Password" type="password" required>
                                                    </v-text-field>
                                                </v-col>

                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn class="align-center">LOGIN</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>

                    </v-layout>
                </v-parallax>
            </section>

        </template>

    </div>
</template>
 
<!--<script>   
export default {
    data() {
        return {
            items: [
                {
                    path: '/',
                    title: 'Login'
                },
                {
                    path: '/register',
                    title: 'Register'
                },
            ],
        }
    },
}
</script> -->
<template>
    <section>
        <v-parallax :src="require('../../assets/people_laundry.jpg')" height="685">
        <v-layout column align-center justify-center class="white--text">
            <v-row class="mt-10">
                <v-col cols="7" class="mt-10">
                    <h1 class="white--text mb-2 mt-10 display-1 text-xs-center" style="font-weight: 900; text-shadow: 3px 2px #000000">The best laundry in the world</h1>
                    <div class="white--text subheading mb-3 text-xs-center" style="font-weight: 900; text-shadow: 2px 2px #000000">Unlesh your creativity without limitations</div>
                    <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
                    About US
                    </v-btn>
                </v-col>
                <v-col cols="5" class="mt-10">
                    <v-card>
                        <v-card-title>
                        <span class="headline">Login</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                            <v-row>
                            
                            <v-col cols="12">
                                <v-text-field label="Username" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Password" type="password" required></v-text-field>
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

<script>   
export default {
    data() {
        return {
            
        }
    },
}
</script> 
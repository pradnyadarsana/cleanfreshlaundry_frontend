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
                                <v-text-field v-model="form.username" label="Username" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="form.password" label="Password" type="password" required></v-text-field>
                            </v-col>
                            
                            </v-row>
                        </v-container>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="align-center" @click="userLogin()">LOGIN</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            
        </v-layout>
        </v-parallax>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
              @click="snackbar = false"> Close </v-btn>
          </v-snackbar>
    </section>
    
</template>

<script>   
import { encode } from 'punycode';
export default {
    data() {
        return {
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                username: '',
                password: ''
            },
            user: new FormData,
            errors: '',
        }
    },
    methods: {
        userLogin() {
            this.user.append('username', this.form.username);
            this.user.append('password', this.form.password);
            var uri = this.$apiUrl + '/auth'
            this.load = true 
            this.$http.post(uri, this.user).then(response => {
                this.snackbar = true; //mengaktifkan snackbar  
                //console.log(response.data.data)             
                if(response.data.data)
                {          
                    this.color = 'green'; //memberi warna snackbar               
                    this.text = 'Login Success'; //memasukkan pesan ke snackbar  
                    localStorage.setItem("user_token", response.data.data.token)
                    localStorage.setItem('username',window.btoa(response.data.data.user['username']))
                    localStorage.setItem('phone',window.btoa(response.data.data.user['phone']))
                    this.$router.push({name : 'HomeController'})
                    //console.log(window.atob(localStorage.getItem("username")))
                }else
                {             
                    this.color = 'red'; //memberi warna snackbar 
                    this.text = 'Login Failed'
                }
                this.load = false;               
                this.dialog = false                             
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },
        resetForm() {
            this.form = {
                username: '',
                password: ''
            }
        },
        logout() {
            localStorage.removeItem('user_token')
            this.$router.push({name : "LoginPage"})
        }
    },
    mounted(){
    }
}
</script> 
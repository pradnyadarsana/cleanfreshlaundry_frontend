<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">USER'S REVIEW</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6>
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon> ADD YOUR OPINION
                        </v-btn>
                    </v-flex>
                    <v-flex xs6 class="text-right">
                        <v-combobox v-model="keyword" :items="review_category" label="Category"></v-combobox>
                    </v-flex>
                </v-layout>
                <template>
                    <v-layout row wrap align-center :search="keyword">
                            <v-flex>
                                <div v-for="item in reviews" :key="item.id" class="mb-3">
                                    <v-card class="mx-auto" max-width="750" outlined>
                                        <v-list-item three-line>
                                            <v-layout>
                                                <v-flex>
                                                    <v-list-item-content>
                                                        <v-list-item-title style="font-size:22px">{{ item.username }}</v-list-item-title>
                                                        <v-list-item-subtitle class="font-weight-light">{{ item.created_at }}</v-list-item-subtitle>
                                                        <v-rating v-model="item.rate" readonly color="yellow" background-color="yellow lighten-3"></v-rating>
                                                        <v-list-item-subtitle class="font-weight-medium" style="font-size:15px">{{ item.description }}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-flex>
                                                <v-flex>
                                                    <v-list-item-content>
                                                        <v-list-item-subtitle class="font-weight-light align-end">Category</v-list-item-subtitle>
                                                        <v-list-item-subtitle style="font-size:18px" class="font-weight-regular align-end">{{ item.category }}</v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </v-flex>
                                                <v-flex xs1>
                                                    <v-list-item-content>
                                                        <v-menu bottom left>
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn dark icon v-on="on" class="align-start">
                                                                    <v-icon color="grey">mdi-dots-vertical</v-icon>
                                                                </v-btn>
                                                            </template>

                                                            <v-list>
                                                                <div v-for="(setting, i) in settings" :key="i" >
                                                                    <v-list-item @click="setting.action">
                                                                        <v-list-item-title>
                                                                            {{ setting.title }}
                                                                            
                                                                        </v-list-item-title>
                                                                        <v-icon class="ml-3">{{ setting.icon }}</v-icon>
                                                                    </v-list-item>
                                                                </div>
                                                                
                                                            </v-list>
                                                        </v-menu>
                                                    </v-list-item-content>
                                                </v-flex>
                                            </v-layout>
                                        </v-list-item>
                                    </v-card>
                                </div>
                            </v-flex>
                        </v-layout>
                </template>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title> <span class="headline">User Profile</span> </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-combobox v-model="form.category" :items="review_category" label="Category*" required></v-combobox>
                            </v-col>
                            <v-col cols="12">
                                <v-rating v-model="form.rate" color="yellow" background-color="yellow lighten-3" required></v-rating>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Description" v-model="form.description"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container> <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            keyword: '',
            review_category: [
                'Service',
                'Duration',
                'Cleanliness',
                'Perfume Aroma',
                'Packaging'
            ],
            settings: [
                {
                    title: 'Edit',
                    icon: 'mdi-pencil',
                    action: 'editHandler(item)'
                },
                {
                    title: 'Delete',
                    icon: 'mdi-delete',
                    action: 'deleteData(item.id)'
                }
            ],
            reviews: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                username: '',
                rate: '',
                category: '',
                description: ''
            },
            review: new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',
        }
    },
    methods: {
        getData() {
            var uri = this.$apiUrl + '/review'
            this.$http.get(uri).then(response => {
                this.reviews = response.data.message
            })
        },
        sendData() {
            this.review.append('username', this.form.username);
            this.review.append('rate', this.form.rate);
            this.review.append('category', this.form.category);
            this.review.append('description', this.form.description);
            var uri = this.$apiUrl + '/review'
            this.load = true 
            this.$http.post(uri, this.review).then(response => {
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;           
            })         
        },         
        updateData(){             
            this.review.append('username', this.form.username);
            this.review.append('rate', this.form.rate);
            this.review.append('category', this.form.category);
            this.review.append('description', this.form.description);           
            var uri = this.$apiUrl + '/review/' + this.updatedId;             
            this.load = true             
            this.$http.post(uri,this.review).then(response =>{ 
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackbar               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();               
                this.typeInput = 'new';           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';               
                this.color = 'red';               
                this.load = false;               
                this.typeInput = 'new';           
            })         
        },         
        editHandler(item){           
            this.typeInput = 'edit';           
            this.dialog = true;           
            this.form.username = item.username;           
            this.form.rate = item.rate;           
            this.form.category = item.category;
            this.form.description = item.description;           
            this.updatedId = item.id         
        },         
        deleteData(deleteId){ //mengahapus data             
            var uri = this.$apiUrl + '/review/' + deleteId; //data dihapus berdasarkan id 
            this.$http.delete(uri).then(response => {
                this.snackbar = true;
                this.text = response.data.message;
                this.color = 'green'
                this.deleteDialog = false;
                this.getData();
            }).catch(error => {
                this.errors = error 
                this.snackbar = true;
                this.text = 'Try Again';
                this.color = 'red';
            })
        }, 
        setForm() {
            if (this.typeInput === 'new') {
                this.sendData()
            } else {
                console.log("dddd")
                this.updateData()
            }
        }, 
        resetForm() {
            this.form = {
                username: '',
                rate: '',
                category: '',
                description: ''
            }
        }
    }, 
    mounted() {
        this.getData();
    },
} 
</script>
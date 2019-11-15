<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                <h2 class="text-md-center">MY ORDER</h2>
                <v-layout row wrap style="margin:10px">
                    <v-flex xs6 class="text-right">
                        <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-btn depressed dark rounded style="text-transform: none !important;" color="green accent-3"
                            @click="dialog = true">
                            <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon> Tambah User
                        </v-btn>
                    </v-flex>
                    
                </v-layout>

                <v-data-table :headers="headers" :items="orders" :search="keyword" :loading="load"> <template
                        v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="item in items" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.address }}</td>
                                <td>{{ item.price_cat }}</td>
                                <td>{{ item.weight }}</td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.status }}</td>
                                <td>{{ item.created_at }}</td>
                                <td class="text-center">
                                    <v-btn icon color="primary_dark" light @click="editHandler(item)">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-btn icon color="warning" light @click="deleteData(item.id)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template> </v-data-table>
            </v-container>
        </v-card>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title> <span class="headline">User Profile</span> </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Address*" v-model="form.address" required>
                                    </v-text-field>
                            </v-col>
                            <v-col>
                                <v-combobox
                                v-model="form.price_cat"
                                :items="price_cat"
                                label="Price Category"
                                ></v-combobox>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field type="number" min="0" label="Weight*" v-model="form.weight" required></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field label="Price Total" v-model="totalPrice" required disabled="">
                                </v-text-field>
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
            headers: [
                {
                    text: 'ID',
                    value: 'id',
                }, 
                {
                    text: 'Address',
                    value: 'address'
                }, 
                {
                    text: 'Price Category',
                    value: 'price_cat'
                }, 
                {
                    text: 'Weight',
                    value: 'weight'
                }, 
                {
                    text: 'Price Total',
                    value: 'price'
                }, 
                {
                    text: 'Status',
                    value: 'status'
                }, 
                {
                    text: 'Date Created',
                    value: 'created_at'
                },
                {
                    text: 'Setting',
                    value: null
                }, 
            ],
            orders: [],
            snackbar: false,
            color: null,
            text: '',
            load: false,
            form: {
                address: '',
                price_cat: '',
                weight: '',
                price: ''
            },
            order: new FormData,
            typeInput: 'new',
            errors: '',
            updatedId: '',
            pricelist: [],
            price_cat: []
        }
    },
    computed:{
        // totalPrice() {
        //     for (var i=0;i<this.price_cat.length;i++){

        //         if(this.price_cat[i] == this.form.price_cat){
        //             var price = parseInt(this.pricelist[i])
        //         }
        //     }
        //     this.form.price = parseInt(this.form.weight)*parseInt(price)
        //     return
        // }
        totalPrice: function(){
            var price = ''
            for (var i=0;i<this.price_cat.length;i++){

                if(this.price_cat[i] == this.form.price_cat){
                    price = parseInt(this.pricelist[i])
                }
            }
            this.form.price = parseInt(this.form.weight)*parseInt(price)
            if (price == '' || this.form.weight == ''){
                return 0
            }else{
                return this.form.price
            }
            
        }
    },
    methods: {
        getPricelistData() {
            var uri = this.$apiUrl + '/pricelist'
            this.$http.get(uri).then(response => {
                var price_category = response.data.message
                for (var i=0;i<price_category.length;i++) {
                    this.price_cat.push(price_category[i].category)
                    this.pricelist.push(price_category[i].price)
                }
                
            })
        },
        getData() {
            var uri = this.$apiUrl + '/order'
            this.$http.get(uri).then(response => {
                this.orders = response.data.message
            })
        },
        sendData() {
            var username = ''
            var phone = ''
            var status = 'Unprocessed'
            this.order.append('username', username);
            this.order.append('phone', phone);
            this.order.append('address', this.form.address);
            this.order.append('price_cat', this.form.price_cat);
            this.order.append('weight', this.form.weight);
            this.order.append('price', this.form.price);
            this.order.append('status', status);
            var uri = this.$apiUrl + '/order'
            this.load = true 
            this.$http.post(uri, this.order).then(response => {
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
            this.order.append('address', this.form.address);
            this.order.append('price_cat', this.form.price_cat);
            this.order.append('weight', this.form.weight);
            this.order.append('price', this.form.price);             
            var uri = this.$apiUrl + '/order/' + this.updatedId;             
            this.load = true             
            this.$http.post(uri,this.order).then(response =>{ 
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
            this.form.address = item.address;           
            this.form.price_cat = item.price_cat;           
            this.form.weight = item.weight,
            this.form.price = item.price,        
            this.updatedId = item.id         
        },         
        deleteData(deleteId){ //mengahapus data             
            var uri = this.$apiUrl + '/order/' + deleteId; //data dihapus berdasarkan id 
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
                address: '',
                price_cat: '',
                weight: '',
                price: ''
            }
        }
    }, 
    mounted() {
        this.getPricelistData();
        this.getData();
    },
} 
</script>
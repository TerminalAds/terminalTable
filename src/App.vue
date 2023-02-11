<template>
    <v-app>
        <template>
            <div style="margin-top: 8rem;margin: 3rem 0.5rem">
                <v-expansion-panels>
                    <v-expansion-panel class="my-1" v-for="(item,index) in desserts" :key="item.id">
                        <v-expansion-panel-header>
                            <div class="row">
                                <v-checkbox @click.stop/>
                                <span class="my-auto mx-2" v-for="header in headers.filter(item=>item.primary)"
                                      :key="headers.value">
                                   <span class="ml-2"> {{ (index + 1) * options.page }}#</span>
                                    <span class="mr-3 font-weight-bold text-center">{{
                                            header.transform ? header.transform(item[header.value]) : item[header.value]
                                        }}</span>
                                </span>
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="row mx-auto py-4">
                                <div class="col-12  text-right">
                                    <div class="my-auto py-1 row" v-for="header in headers.filter((item)=>!item.primary)"
                                       :key="headers.value">
                                    <p style="font-weight: 700;color: indigo">{{ header.title }} : </p>
                                    <p class="mr-auto">{{ item[header.value] }}</p>
                                    </div>
                                </div>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>

                <div class="text-center pt-2">
                    <v-pagination
                            v-model="options.page"
                            :length="pageCount"
                            @input="changePaginate($event)"
                            circle
                            total-visible="3"
                            color="indigo"
                    ></v-pagination>
                </div>

            </div>
        </template>
    </v-app>
</template>

<script>
import {Axios2} from "@/main";
import Buttons from "../src/button";

export default {
    components: {Buttons},
    data() {
        return {
            search: '',
            options: {
                search: '',
                length: 10,
                column: 'id',
                dir: 'desc',
                page: 1,
            },
            per: 0,
            pageCount: 0,
            expanded: [],
            calories: '',
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: 1,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: 1,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: 7,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: 8,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: 16,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: 0,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: 2,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: 45,
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: 22,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: 6,
                },
            ],
            headers: [
                {
                    title: 'شناسه',
                    value: 'id',
                },
                {
                    title: 'شناسه',
                    value: 'type',
                    primary: true,
                    transform: function (data) {
                        return {
                            'minute': 'تدریجی'
                        }[data];
                    }
                },
                {
                    title: 'موضوع',
                    value: 'count',

                },
                {
                    title: 'ایجاد',
                    value: 'created_at_diff'
                },
                {
                    title: 'انقضا',
                    value: 'expire_at_diff'
                },
                {
                    title: 'تعداد',
                    value: 'per'
                },
                {
                    title: 'وضعیت',
                    value: 'start_at_p'
                },
            ],
        }
    },
    computed: {
        // countingPage(){
        //     let row = this.pageCount;
        //     row = row * this.per;
        //     return row + row + 1;
        // }
    },
    methods: {
        filterOnlyCapsText(value, search) {
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1
        },
        getData() {
            Axios2.get('smarts', {
                params: Object.assign({}, this.options)
            }).then((response) => {
                this.pageCount = response.data.last_page
                this.per = response.data.per_page
                this.desserts = response.data.data
                console.log(response.data.data)
            })
        },
        clickRow(item, event) {
            console.log(event, item)
            if (event.isExpanded) {
                const indexExpanded = this.expanded.findIndex(i => i === item);
                this.expanded.splice(indexExpanded, 1)
            } else {
                this.expanded.push(item);
            }
        },
        changePaginate(e) {
            this.options.page = e;
            this.getData()
        },
    },
    mounted() {
        this.getData()
    }
}
</script>

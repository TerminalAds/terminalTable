<template>
    <v-app>
        <template>
            <div style="margin-top: 9rem;margin: 3rem 0.5rem">
                <v-expansion-panels class="mt-10">
                    <v-expansion-panel dense class="my-1 " v-for="(item,index) in datas.data" :key="item.id">
                        <v-expansion-panel-header class="py-0" style="background:#bce8d7;color:black">
                            <div class="row">
                                <v-checkbox @click.stop/>
                                <span class="ml-2 my-auto"> {{ (index + 1) * options.page }}#</span>
                                <span @click.stop class="my-auto"
                                      v-for="header in headers.filter(item=>item.primary)" :key="header.name">
                                    <span class="mr-3 font-weight-bold text-center"
                                          v-html="header.transform ? header.transform(item) : item[header.name]"></span>
                                </span>
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="pt-4">
                            <div class="col-12 row pl-0 pr-1 py-0 my-1"
                                 v-for="header in headers.filter((item)=>!item.primary)" :key="header.name">
                                <div v-if="header.label!=='مدیریت'" class="col-6 py-0 my-0"
                                     :key="headers.value">
                                    <p style="font-weight: 700;color: darkblue" v-html="header.label"></p>
                                </div>
                                <div v-if="header.label!=='مدیریت'" class="col-6 py-0 my-0 text-left">
                                    <p class="font-weight-bold" v-if="header.label!=='مدیریت'"
                                       v-html="header.transform ? header.transform(item):item[header.name]"></p>
                                </div>
                                <v-btn color="green" class="col-12 text-white font-weight-bold" small v-else
                                       @click="showBtn=!showBtn"> مدیریت
                                </v-btn>
                                <div v-if="showBtn" class="mx-auto">
                                    <component :is="header.component" :data="item" :meta="header.meta"></component>

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
import Buttons from "../src/templateBtn";

export default {
    components: {Buttons},
    props: {
        datas: {
            required: true,
            default: []
        },
        headers: {
            required: true,
            default: []
        },
        options: {
            search: '',
            length: 10,
            column: 'id',
            dir: 'desc',
            page: 1,
        },
        getData: {
            default: () => {
            }
        },
        pageCount:{
            default:0
        }
    },
    data() {
        return {
            search: '',
            per: 0,
            showBtn: false,
            expanded: [],
            calories: '',
        }
    },
    methods: {
        clickRow(item, event) {
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

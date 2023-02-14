<template>
    <v-app>
        <template>
            <div style="margin: 3rem 0.5rem">

                <v-btn style="background-color: #863A6F" class="col-12 text-white font-weight-bold"
                       @click="showSearch=!showSearch"> فیلتر
                </v-btn>
                <div v-if="showSearch">
                        <v-text-field
                                v-model="options.search"
                                label="جستجو"
                                outlined
                                required
                                clearable
                                @click:clear="searchReset"
                                clear-icon="mdi-close-circle-outline"
                                dense
                                class="mt-1 py-0"
                        >
                            <template v-slot:append >
                                <v-btn small outlined color="indigo" class="font-weight-bold px-0 mx-0"
                                       @click="searchText">
                                    <i class="fa fa-search" style="color: darkblue"></i>
                                </v-btn>
                            </template>
                        </v-text-field>

                    <v-autocomplete
                            v-model="options.length"
                            label="تعداد در صفحه"
                            :items="lengthPage"
                            item-text="text"
                            @change="changeLength"
                            item-value="value"
                            outlined
                            required
                            dense
                            prepend-inner-icon="fa fa-pencil-alt"
                    ></v-autocomplete>
                </div>

                <v-expansion-panels class="mt-10 px-0">
                    <v-expansion-panel dense class="my-1 px-0" v-for="(item,index) in datas.data" :key="item.id">
                        <v-expansion-panel-header class="py-0 " style="background:#863A6F;color:white">
                            <div class="row">
                                <v-checkbox color="white" @click.stop/>
                                <span class="ml-2 my-auto"> {{ setRows(index) }}#</span>
                                <span class="my-auto"
                                      v-for="header in headers.filter(item=>item.primary)" :key="header.name">
                                    <span  class="mr-3 font-weight-bold text-center"
                                          v-html="header.transform ? header.transform(item) : item[header.name]"></span>
                                </span>
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content style="background:#F7ECDE;" class="pt-4">
                            <div class="row px-0 py-0 my-1" v-for="header in headers.filter((item)=>!item.primary)"
                                 :key="header.name">
                                <div v-if="header.label!=='مدیریت' && header.label!=='ردیف' && header.label!=='' && header.label !== ''" class="col-6 py-0 my-0"
                                     :key="headers.value">
                                    <p style="font-weight:bolder;color: #863A6F" v-html="header.label"></p>
                                </div>
                                <div v-if="header.label!=='مدیریت'" class="col-6 py-0 my-0 text-left">
                                    <p class="font-weight-bold" v-if="header.label!=='مدیریت' && header.label!=='ردیف' && header.label!== '' "
                                       v-html="header.transform ? header.transform(item):item[header.name]"></p>
                                </div>
                                <v-btn style="background-color: #863A6F" class="col-12 text-white font-weight-bold"
                                       small v-else
                                       @click="showBtn=!showBtn"> مدیریت
                                </v-btn>
                                <div v-if="showBtn" class="py-0 col-12">
                                    <component :is="header.component" :data="item" :meta="header.meta"></component>
                                </div>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
            <div class="text-center px-0 mx-0">
                <v-pagination
                        v-model="options.page"
                        small
                        :length="pageCount"
                        @input="changePaginate($event)"
                        @click="changePaginate($event)"
                        :total-visible="5"
                        color="indigo"
                ></v-pagination>
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
        pageCount: {
            default: 0
        },
        currentPage: {
            default: 0
        },
        perPage: {
            default: 0
        },
    },
    data() {
        return {
            search: '',
            per: 0,
            showBtn: false,
            showSearch: false,
            expanded: [],
            lengthPage: [
                {text: 10, value: 10},
                {text: 25, value: 25},
                {text: 50, value: 50},
                {text: 100, value: 100},
                {text: 500, value: 500},
            ],
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
        changeLength() {
            this.getData()
        },
        searchText() {
            this.getData()
        },
        searchReset() {
            this.options.search='';
            this.getData()
        },
        setRows(val) {
            let row = (this.currentPage-1) * Number(this.perPage);
            return row + val + 1;
        }
    },

    mounted() {
        this.getData()
    }
}
</script>

<template>
    <v-app>
        <template>
            <div>
                <div style="margin: 3rem 0.5rem">
                    <v-expansion-panels style="padding: 0" class="px-0">
                        <v-expansion-panel dense class="mb-1 elevation-2 p-0">
                            <v-expansion-panel-header class="py-0 "
                                                      @click="showSearch=!showSearch"
                                                      style="background-image: linear-gradient(to right, #24C6DC, #514A9D);color:white">
                                <template v-slot:actions>
                                    <v-icon color="white">
                                        $expand
                                    </v-icon>
                                </template>
                                فیلتر
                            </v-expansion-panel-header>
                            <v-expansion-panel-content style="background:white;border-radius:0px 0px 10px 10px" class="pt-4">
                                <div>
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
                                        <template v-slot:append>
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

                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
                <div v-if="datas.data.length <= 0" class="mt-25">
                    <img src="https://cdn3d.iconscout.com/3d/premium/thumb/search-not-found-7328010-5980397.png"
                         class="img-fluid" alt="">
                    <p class="text-center">هیچ اطلاعات ثبت شده ای وجودندارد.</p>
                </div>
                <div v-else>
                    <v-checkbox v-model="selectedAll" label="انتخاب همه"></v-checkbox>
                    <v-expansion-panels style="border-radius: 10px;padding: 0" class="px-0">
                        <v-expansion-panel style="border-radius: 10px;padding: 0" dense class="mb-1 elevation-2 p-0"
                                           v-for="(item,index) in datas.data" :key="item.id">
                            <v-expansion-panel-header class="py-0 "
                                                      style="background-image: linear-gradient(to right, #5C258D, #4389A2);color:white;border-radius: 10px 10px 0px 0px">
                                <template v-slot:actions>
                                    <v-icon color="white">
                                        $expand
                                    </v-icon>
                                </template>
                                <div class="row">
                                    <v-checkbox :value="item.id" v-model="selected" color="white" @click.stop/>
                                    <span class="ml-1 my-auto"> {{ setRows(index) }}</span>
                                    <span class="my-auto"
                                          v-for="header in headers.filter(item=>item.primary)" :key="header.name">
                                    <span style="font-size: 7.1pt" class="mr-1 font-weight-bold text-center"
                                          v-html="header.transform ? header.transform({data:item}) : item[header.name]"></span>
                                </span>
                                </div>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content style="background:white;border-radius:0px 0px 10px 10px"
                                                       class="pt-4">
                                <div class="row px-0 py-0 my-1" v-for="header in headers.filter((item)=>!item.primary && !item.isCheckBox)"
                                     :key="header.name">
                                    <div v-if="header.label!=='مدیریت' && header.label!=='ردیف' && header.label!=='' && header.label !== ''"
                                         class="col-6 py-0 my-0"
                                         :key="headers.value">
                                        <p style="font-weight:bolder;color: black" v-html="header.label"></p>
                                    </div>
                                    <div v-if="header.label!=='مدیریت'" class="col-6 py-0 my-0 text-left">
                                        <p class="font-weight-bold"
                                           v-if="header.label!=='مدیریت' && header.label!=='ردیف' && header.label!== '' "
                                           v-html="header.transform ? header.transform({data:item}):item[header.name]"></p>
                                    </div>
                                    <v-btn style="background-image: linear-gradient(to right, #5C258D, #4389A2)"
                                           class="col-12 text-white font-weight-bold"
                                           small v-else
                                           @click="showBtn=!showBtn"> مدیریت
                                    </v-btn>
                                    <div v-if="showBtn" class="py-0 col-12" :key="index">
                                        <component :is="header.component" :data="item" :meta="header.meta"></component>
                                    </div>
                                </div>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <div class="text-center col-12 px-0 mt-4 mx-0">
                        <div class="d-flex">
                            <v-text-field
                                    v-model.number="options.page"
                                    label="شماره صفحه"
                                    @keypress.enter="changePaginate(options.page)"
                                    required
                                    :loading="finishedLoad"
                                    dense
                                    class="mt-1 col-6 py-0"
                            ></v-text-field>
                            <v-btn small outlined color="indigo" class="font-weight-bold mt-4 mr-auto mx-3"
                                   @click="changePaginate(options.page)">
                                <i class="fa fa-search ml-1" style="color: darkblue"></i>
                                جستجوی صفحه
                            </v-btn>
                        </div>
                        <v-pagination
                                v-model="options.page"
                                small
                                :length="pageCount"
                                @input="changePaginate($event)"
                                color="indigo"
                        ></v-pagination>
                    </div>
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
            selected: [],
            showBtn: false,
            showSearch: false,
            finishedLoad: false,
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
            this.finishedLoad = true
            this.options.page = e;
            this.getData();
            this.finishedLoad = false
            this.selectedAll = false;
        },
        changeLength() {
            this.getData()
        },
        searchText() {
            this.getData()
        },
        searchReset() {
            this.options.search = '';
            this.getData()
        },
        setRows(val) {
            let row = (this.currentPage - 1) * Number(this.perPage);
            return row + val + 1;
        }
    },
    computed: {
        selectedAll: {
            set(val) {
                this.selected = [];
                if (val) {
                    this.datas.data.forEach((item) => {
                        this.selected.push(item.id)
                    })
                }
            },
            get() {
                return this.selected.length === this.datas.data
            }
        }
    },
    mounted() {
        this.getData()
    },
    watch:{
        selected:()=>{
            console.log(this.selected)
            this.$emit('input', this.selected)
        }
    }
}
</script>

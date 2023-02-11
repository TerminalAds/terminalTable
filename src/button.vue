<template>
    <div>
        <div class="mt-3 ">
            <v-speed-dial
                    v-model="fab"
                    :top="top"
                    :bottom="bottom"
                    :right="right"
                    :left="left"
                    :direction="direction"
                    :open-on-hover="hover"
                    :transition="transition">
                <template v-slot:activator>
                    <v-btn v-model="fab" fab icon x-small title="عملیات">
                        <v-icon v-if="fab" color="pink darken-1">mdi-close</v-icon>
                        <span v-else class="svg-icon svg-icon-dark svg-icon-2x">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                 width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <rect x="0" y="0" width="24" height="24"/>
                                <circle fill="#000000" cx="12" cy="5" r="2"/>
                                <circle fill="#000000" cx="12" cy="12" r="2"/>
                                <circle fill="#000000" cx="12" cy="19" r="2"/>
                            </g>
                        </svg>
                        </span>
                    </v-btn>
                </template>
                <v-btn
                        fab
                        small
                        v-for="(item, index) in meta.buttons" :key="index"
                        v-status="item.status"
                        :title="item.label"
                        v-show="item.condition ? validation(item) : true "
                        :class="classBtn + item.class" @click="item.action(data, item.name)">
                    <i :class="iconClass + item.icon"></i>
                </v-btn>
            </v-speed-dial>
        </div>
    </div>
</template>

<script>
export default {
    name: "buttons",
    props: {
        data: {},
        action: {
            type: Function,
        },
        meta: {
            type: Object,
        }
    },
    data() {
        return {
            classBtn: 'btn btn-sm text-center ',
            iconClass: 'px-1 text-center fa fa-',
            direction: 'right',
            color: {
                'edit': 'warning',
                'delete': 'error',
                'show': 'info',
                "refresh": 'indigo',
            },
            fab: false,
            fling: false,
            hover: false,
            tabs: null,
            top: false,
            right: true,
            bottom: true,
            left: false,
            transition: 'slide-x-reverse-transition',
        };
    },
    watch: {
        top(val) {
            this.bottom = !val
        },
        right(val) {
            this.left = !val
        },
        bottom(val) {
            this.top = !val
        },
        left(val) {
            this.right = !val
        },
    },
    methods: {
        validation(item) {
            if (this.data.payment) {
                return item.condition(this.data.payment)
            } else if (this.data.deleted_at) {
                return item.condition(this.data.deleted_at)}
            else if (this.data.owner_id) {
                return item.condition(this.data.owner_id)
            } else if (this.data.data) {
                return item.condition(this.data.data.status || this.data.status)
            } else
                return true;
        }
    }
}
</script>
<style>
#create .v-speed-dial {
    position: absolute;
}

#create .v-btn--floating {
    position: relative;
}
</style>

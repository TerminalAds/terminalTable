<template>
    <div>
        <div class="mt-3 ">
            <v-btn
                    small
                    v-for="(item, index) in meta.buttons" :key="index"
                    v-status="item.status"
                    :title="item.label"
                    v-show="item.condition ? validation(item) : true "
                    :class="classBtn + item.class" @click="item.action(data, item.name)">
                <i :class="iconClass + item.icon"></i>
                {{item.label}}
            </v-btn>
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
            classBtn: 'btn btn-sm text-center m-1 ',
            iconClass: 'text-center fa fa-',
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

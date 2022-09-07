<template>
  <tr>
    <td>
      <span>{{ project.project_id }}</span>
    </td>
    <td>
      <span>{{ project.project_type.project_type_name }}</span>
    </td>
    <td>
      <span>{{ project.project_name }}</span>
    </td>
    <td>
      <span>{{ project.project_manger }}명</span>
    </td>
    <td>
      <span>{{ createdTime }}</span>
    </td>
    <td class="table1-more">
      <button @click="update">
        <img
          src="../../../../assets/images/project/icon/icon-more.svg"
          alt=""
        />
      </button>
<!--      <ul class="more-detail" v-show="updateState">-->
<!--        <li>-->
<!--          <button>-->
<!--            <router-link-->
<!--              :to="{-->
<!--                path:-->
<!--                  '/allProject' +-->
<!--                  project.projectTypeLink +-->
<!--                  '/setting/' +-->
<!--                  project.projectTypeLink.split('_')[1],-->
<!--              }"-->
<!--              ><span>수정</span></router-link-->
<!--            >-->
<!--          </button>-->
<!--        </li>-->
<!--        <li>-->
<!--          <button><span>삭제</span></button>-->
<!--        </li>-->
<!--      </ul>-->
    </td>
  </tr>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'projectItem',
  props: {
    project: {
      type: Object,
      default: () => ({}),
    },
    pageNum: Number,
    pageSizeSelect: Number,
  },
  computed: {
    ...mapState('allProject', ['projects']),
    createdTime() {
      let createdDate = new Date(this.project.created);
      return createdDate.toLocaleDateString();
    },
  },
  data() {
    return {
      updateState: false,
    };
  },
  methods: {
    update() {
      this.updateState = !this.updateState;
    },
  },
  mounted() {},
};
</script>

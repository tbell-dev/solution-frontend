import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';

export default {
  state: () => ({
    projects: [],
    message: '',
  }),
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key];
      });
    },
  },
  actions: {
    async searchProject({ state, commit }, payload) {
      try {
        const res = await _getProjectList({
          ...payload,
        });
        const project = res.data;
        console.log(project);
        commit('updateState', {
          projects: _uniqBy(project, 'projectName'),
        });
      } catch (message) {
        commit('updateState', {
          projects: [],
          message,
        });
      }
    },
  },
  modules: {},
  namespaced: 'true',
};

function _getProjectList(payload) {
  const { projectName, date } = payload;
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://210.113.122.196:8826/rest/api/1/project/search?project_created_start=1061790170`,
      )
      .then(r => {
        if (r.data.Error) {
          reject(r.data.Error);
        }
        resolve(r);
      })
      .catch(err => {
        reject(err.message);
      });
  });
}

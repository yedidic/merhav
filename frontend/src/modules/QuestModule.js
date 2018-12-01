import QuestService from '../services/QuestService';
import StorageService, { CURR_EXAM } from '../services/StorageService'
import { log } from 'util';

export const GET_QUESTS = 'quest/query'

export default {
    state: {
        quests: null
    },
    mutations: {
        [GET_QUESTS](state, { quests }) {
            state.quests = quests;
        }

    },
    actions: {
        [GET_QUESTS]({ commit }, { ids }) {
            return QuestService.query()
                .then(quests => commit({ type: GET_QUESTS, quests }))
        }

    },
    getters: {
        quests({ quests }) {
            return quests;
        }
    }
};
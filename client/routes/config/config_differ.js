"use strict";

import _ from "lodash";

export const CONFIG_STATE = { STAGED: "staged", CURRENT: "current" };

// TODO: group by category, then sub-category, map into table structure that it currentl expects

const getDiff = (configurations) => {
    const stagedConfig = _.filter(configurations, { state: CONFIG_STATE.STAGED });
    const currentConfig = _.filter(configurations, { state: CONFIG_STATE.CURRENT });

    return _(stagedConfig)
    .difference(currentConfig)
    .map(changedConfig => {
        const oldConfig = _.find(currentConfig, (config) => {
            return (config.id === changedConfig.id) && (config.host === changedConfig.host);
        });

        return _.assign(oldConfig, {
            diff: {
                old: oldConfig.value,
                new: changedConfig.value
            }
        });
    })
    .value();
};

export default (rawConfig) => {
    if (!rawConfig) {
        return;
    }

    const diff = getDiff(rawConfig.configurations);
    const hosts = _(diff)
    .map("host")
    .uniq()
    .map((host) => {
        return {
            id: _.uniqueId(host),
            name: host,
            configs: _.filter(diff, { host: host }),
            categories: []
        };
    })
    .map((host) => {
        host.categories = _(host.configs)
        .map("category")
        .uniq()
        .map((category) => {
            const currentCategoryConfig = _.filter(host.configs, { category });
            const configs = _.filter(currentCategoryConfig, { category });

            return {
                id: _.uniqueId(category),
                name: category,
                href: currentCategoryConfig[0].category_href,
                configs
            };
        })
        .value();

        delete host.configs;
        return host;
    })
    .value();

    return { hosts };
};

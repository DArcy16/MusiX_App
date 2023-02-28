'use strict';

/**
 * recent service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recent.recent');

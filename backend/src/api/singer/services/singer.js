'use strict';

/**
 * singer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::singer.singer');

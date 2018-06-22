/**
 * @file spawnSky.js
 * AFrame component responsible for the sky sound components.
 */

/* globals AFRAME */

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

/**
 * AFrame component that sets the sky src attribute based on the current route.
 */
const spawnSky = {
  multiple: false,
  init: function init() {
    this.setSkyUrl();
  },
  didReceiveProps: function didReceiveProps() {
    this.setSkyUrl();
  },
  setSkyUrl: function setSkyUrl() {
    // If there is no router or experience data, exit.
    if (!this.router || !this.props.experience.item.field_scenes) {
      return;
    }

    const {
      props: {
        experience: { item }
      },
      router: {
        match: {
          params: { sceneSlug }
        }
      }
    } = this;

    // If a scene exists for the given slug, render it's video or photo sphere.
    const scene = item.field_scenes.filter(s => s.field_slug === sceneSlug)[0];
    if (scene) {
      const sky = scene.field_videosphere || scene.field_photosphere;
      const url = new URL(sky.links.self);
      this.el.setAttribute('src', `${url.origin}${sky.url}`);
    }
  }
};

AFRAME.registerComponent(
  'spawn-sky',
  connectRedux(state => ({
    experience: state.openExperience
  }))(
    connectRouter(spawnSky, '/experience/vreditor/:experienceSlug/:sceneSlug')
  )
);

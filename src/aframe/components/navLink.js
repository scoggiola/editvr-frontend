/**
 * @file link.js
 * Link component.
 */

/* globals AFRAME */

import connectRedux from '../utils/connectRedux';
import connectRouter from '../utils/connectRouter';

/**
 * AFrame component that constructs a link entity, and destroys it when the
 * route has changed.
 */
const navLink = {
  multiple: true,
  init() {
    this.render();
  },
  shouldComponentUpdateRouting(oldProps, newProps) {
    if (oldProps.history.location !== newProps.history.location) {
      return true;
    }

    return false;
  },
  didReceiveProps() {
    this.render();
  },
  didReceiveRoute() {
    this.destroy();
  },
  destroy() {
    this.el.parentNode.removeChild(this.el);
  },
  render() {
    // If there is no router or experience data, exit.
    if (!this.router || !this.props.experience.scenes) {
      return;
    }

    const {
      props: { experience },
      router: {
        match: {
          params: { sceneSlug, experienceSlug }
        }
      }
    } = this;

    const component =
      experience.scenes[sceneSlug].components[this.el.getAttribute('id')] ||
      null;
    if (component) {
      const {
        field_x: x,
        field_y: y,
        field_z: z,
        title,
        field_scene_link: { field_slug: to }
      } = component;
      this.el.setAttribute('look-at', '[camera]');
      this.el.setAttribute('position', { x, y, z });
      this.el.setAttribute('title', title);
      this.el.setAttribute('color', 'white');
      this.el.setAttribute(
        'href',
        `/experience/vreditor/${experienceSlug}/${to}`
      );
    }
  }
};

AFRAME.registerComponent(
  'nav-link',
  connectRedux(state => ({
    experience: state.openExperience.item
  }))(connectRouter(navLink, '/experience/vreditor/:experienceSlug/:sceneSlug'))
);

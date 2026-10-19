/**
 * Central image URL helpers. All photography is served from CDN sources with
 * responsive width params so layouts can request exactly the size they need.
 */

export const unsplash = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const pexels = (id, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

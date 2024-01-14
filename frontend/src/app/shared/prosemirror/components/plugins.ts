import { Plugin } from 'prosemirror-state';
import { getMentionsPlugin } from '../prosemirror-mentions';
import {AppUserModel} from "../../../user/models/appUserModel.interface";

/**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
var getMentionSuggestionsHTML = (items : AppUserModel[]) =>
  '<div class="suggestion-item-list">' +
  items
    .map((i) => '<div class="suggestion-item">' + i.firstName + ' ' + i.lastName + '</div>')
    .join('') +
  '</div>';

/**
 * IMPORTANT: outer div's "suggestion-item-list" class is mandatory. The plugin uses this class for querying.
 * IMPORTANT: inner div's "suggestion-item" class is mandatory too for the same reasons
 */
// var getTagSuggestionsHTML = (items ) =>
//   '<div class="suggestion-item-list">' +
//   items
//     .map((i) => '<div class="suggestion-item">' + i.tag + '</div>')
//     .join('') +
//   '</div>';

export const mentionPlugin = (users : AppUserModel[]) => getMentionsPlugin({
  getSuggestions: (type, text, done) => {
    setTimeout(() => {
      if (type === 'mention') {
        // autocomplete : filter list from text and return 5 users
        done(
          users
            .filter(x =>
              x.firstName.toLowerCase().includes(text.toLowerCase())
              ||  x.lastName.toLowerCase().includes(text.toLowerCase()))
            .splice(0, 5)
        );
      }
      // else {
      //   // pass dummy tag suggestions
      //   done([
      //     {
      //       tag: 'WikiLeaks',
      //     },
      //     {
      //       tag: 'NetNeutrality',
      //     },
      //   ]);
      // }
    }, 0);
  },
  getSuggestionsHTML: (items, type) => {
    if (type === 'mention') {
      return getMentionSuggestionsHTML(items);
    // } else if (type === 'tag') {
    //   return getTagSuggestionsHTML(items);
    } else {
      return null;
    }
  },
});

// export const getPlugins = (users): Plugin[] => {
//   const plugins = [mentionPlugin(users)];
//
//   return plugins;
// };

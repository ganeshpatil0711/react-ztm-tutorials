import { createSelector } from "reselect";

const categoriesReducer = state => state.categories;

const selectCategories = createSelector(
  [categoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) => {
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);
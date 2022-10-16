import CategoryList from "../components/Category/CategoryList.vue";

import CategoryForm from "../components/Category/CategoryForm.vue";

const categories=[
    { path: '/category', component: CategoryList },
    { name: "categoryForm", path: '/categoryForm', component: CategoryForm },
]

export default categories;
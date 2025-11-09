import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
const RedirectController4b87d2df7e3aa853f6720faea796e36c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'get',
})

RedirectController4b87d2df7e3aa853f6720faea796e36c.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/settings',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.url = (options?: RouteQueryOptions) => {
    return RedirectController4b87d2df7e3aa853f6720faea796e36c.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
RedirectController4b87d2df7e3aa853f6720faea796e36c.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
    const RedirectController4b87d2df7e3aa853f6720faea796e36cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/settings'
 */
        RedirectController4b87d2df7e3aa853f6720faea796e36cForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController4b87d2df7e3aa853f6720faea796e36c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController4b87d2df7e3aa853f6720faea796e36c.form = RedirectController4b87d2df7e3aa853f6720faea796e36cForm
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
const RedirectControllera1107be8198690e416f0c60b5f6d525a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
    method: 'get',
})

RedirectControllera1107be8198690e416f0c60b5f6d525a.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/driver/settings',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
RedirectControllera1107be8198690e416f0c60b5f6d525a.url = (options?: RouteQueryOptions) => {
    return RedirectControllera1107be8198690e416f0c60b5f6d525a.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
RedirectControllera1107be8198690e416f0c60b5f6d525a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
RedirectControllera1107be8198690e416f0c60b5f6d525a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
RedirectControllera1107be8198690e416f0c60b5f6d525a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
RedirectControllera1107be8198690e416f0c60b5f6d525a.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
RedirectControllera1107be8198690e416f0c60b5f6d525a.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
RedirectControllera1107be8198690e416f0c60b5f6d525a.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
RedirectControllera1107be8198690e416f0c60b5f6d525a.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
    const RedirectControllera1107be8198690e416f0c60b5f6d525aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
        RedirectControllera1107be8198690e416f0c60b5f6d525aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
        RedirectControllera1107be8198690e416f0c60b5f6d525aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllera1107be8198690e416f0c60b5f6d525a.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
        RedirectControllera1107be8198690e416f0c60b5f6d525aForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllera1107be8198690e416f0c60b5f6d525a.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
        RedirectControllera1107be8198690e416f0c60b5f6d525aForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllera1107be8198690e416f0c60b5f6d525a.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
        RedirectControllera1107be8198690e416f0c60b5f6d525aForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllera1107be8198690e416f0c60b5f6d525a.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
        RedirectControllera1107be8198690e416f0c60b5f6d525aForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectControllera1107be8198690e416f0c60b5f6d525a.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/driver/settings'
 */
        RedirectControllera1107be8198690e416f0c60b5f6d525aForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectControllera1107be8198690e416f0c60b5f6d525a.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectControllera1107be8198690e416f0c60b5f6d525a.form = RedirectControllera1107be8198690e416f0c60b5f6d525aForm
    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
const RedirectController0c70edcc722471a5b69e029da05ad7cd = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'get',
})

RedirectController0c70edcc722471a5b69e029da05ad7cd.definition = {
    methods: ["get","head","post","put","patch","delete","options"],
    url: '/admin/settings',
} satisfies RouteDefinition<["get","head","post","put","patch","delete","options"]>

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
RedirectController0c70edcc722471a5b69e029da05ad7cd.url = (options?: RouteQueryOptions) => {
    return RedirectController0c70edcc722471a5b69e029da05ad7cd.definition.url + queryParams(options)
}

/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
RedirectController0c70edcc722471a5b69e029da05ad7cd.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'get',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
RedirectController0c70edcc722471a5b69e029da05ad7cd.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'head',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
RedirectController0c70edcc722471a5b69e029da05ad7cd.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'post',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
RedirectController0c70edcc722471a5b69e029da05ad7cd.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'put',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
RedirectController0c70edcc722471a5b69e029da05ad7cd.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'patch',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
RedirectController0c70edcc722471a5b69e029da05ad7cd.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'delete',
})
/**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
RedirectController0c70edcc722471a5b69e029da05ad7cd.options = (options?: RouteQueryOptions): RouteDefinition<'options'> => ({
    url: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
    method: 'options',
})

    /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
    const RedirectController0c70edcc722471a5b69e029da05ad7cdForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
        method: 'get',
    })

            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
        RedirectController0c70edcc722471a5b69e029da05ad7cdForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
        RedirectController0c70edcc722471a5b69e029da05ad7cdForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
        RedirectController0c70edcc722471a5b69e029da05ad7cdForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url(options),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
        RedirectController0c70edcc722471a5b69e029da05ad7cdForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
        RedirectController0c70edcc722471a5b69e029da05ad7cdForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
        RedirectController0c70edcc722471a5b69e029da05ad7cdForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Illuminate\Routing\RedirectController::__invoke
 * @see vendor/laravel/framework/src/Illuminate/Routing/RedirectController.php:19
 * @route '/admin/settings'
 */
        RedirectController0c70edcc722471a5b69e029da05ad7cdForm.options = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: RedirectController0c70edcc722471a5b69e029da05ad7cd.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'OPTIONS',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    RedirectController0c70edcc722471a5b69e029da05ad7cd.form = RedirectController0c70edcc722471a5b69e029da05ad7cdForm

const RedirectController = {
    '/settings': RedirectController4b87d2df7e3aa853f6720faea796e36c,
    '/driver/settings': RedirectControllera1107be8198690e416f0c60b5f6d525a,
    '/admin/settings': RedirectController0c70edcc722471a5b69e029da05ad7cd,
}

export default RedirectController
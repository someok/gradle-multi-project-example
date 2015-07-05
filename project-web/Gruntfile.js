module.exports = function(grunt) {

    var timestamp = grunt.template.today("yyyymmddhhMM");

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webappdir: 'src/main/webapp',

        // 不能用这种直接定义的, 否则每次调用 curTimestamp 的时候都会运行一次
        // 后面的方法, 这会导致时间变化
        // curTimestamp: '<%= grunt.template.today("yyyymmdd") %>',
        curTimestamp: timestamp,

        less: {
            // font 已无用
            /*
            font: {
                options: {
                    paths: ['<%= webappdir %>/static/less/font']
                },
                files: {
                    '<%= webappdir %>/static/css/font-awesome.css': '<%= webappdir %>/static/less/font/font-awesome.less',
                    '<%= webappdir %>/static/css/font-awesome-ie7.css': '<%= webappdir %>/static/less/font/font-awesome-ie7.less'
                }
            },*/
            development: {
                options: {
                    paths: ['<%= webappdir %>/static/less']
                },
                files: {
                    '<%= webappdir %>/static/css/admin.css': '<%= webappdir %>/static/less/admin.less',
                    '<%= webappdir %>/static/css/ent.css': '<%= webappdir %>/static/less/ent.less'
                }
            },
            production: {
                options: {
                    paths: ['<%= webappdir %>/static/less'],
                    cleancss: true,
                    // report: 'gzip'
                },
                files: {
                    '<%= webappdir %>/static/dist/<%= curTimestamp %>/css/admin.min.css': '<%= webappdir %>/static/less/admin.less',
                    '<%= webappdir %>/static/dist/<%= curTimestamp %>/css/ent.min.css': '<%= webappdir %>/static/less/ent.less'
                }
            },

            // tinymce begin
            modern: {
                options: {
                    cleancss: true,
                    strictImports: true
                },

                expand: true,
                src: ["<%= webappdir %>/static/tinymce/4.1.9/skins/**/skin.modern.dev.less"],
                ext: ".min.css"
            },

            ie7: {
                options: {
                    compress: true,
                    strictImports: true,
                    ieCompat: true
                },

                expand: true,
                src: ["<%= webappdir %>/static/tinymce/4.1.9/skins/**/skin.ie7.dev.less"],
                ext: ".ie7.min.css"
            },

            content: {
                options: {
                    cleancss: true,
                    strictImports: true
                },

                rename: function(dest, src) {
                    return src.toLowerCase();
                },

                expand: true,
                src: ["<%= webappdir %>/static/tinymce/4.1.9/skins/**/Content.less"],
                ext: ".min.css"
            },

            "content-inline": {
                options: {
                    cleancss: true,
                    strictImports: true
                },

                rename: function(dest, src) {
                    return src.toLowerCase();
                },

                expand: true,
                src: ["<%= webappdir %>/static/tinymce/4.1.9/skins/**/Content.Inline.less"],
                ext: ".inline.min.css"
            }
            // tinymce end
        },


        // 此功能已经不再需要, 直接采用 requirejs 的打包压缩功能
        uglify: {
            options: {
                // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                banner: [
                            '/*!',
                            ' * <%= pkg.name %> ',
                            ' * Build @ <%= grunt.template.today("yyyy-mm-dd") %>',
                            ' */\n'
                        ].join('\n')
            },
            build: {
                // 压缩给定文件夹下的所有js,并自动替换原有文件
                files: [{
                    expand: true,
                    cwd: '<%= webappdir %>/static/dist/<%= curTimestamp %>/js',
                    src: '**/*.js',
                    dest: '<%= webappdir %>/static/dist/<%= curTimestamp %>/js'
                }]
                // src: '<%= webappdir %>/static/js-dist/main.js',
                // dest: '<%= webappdir %>/static/js-dist/main.min.js'
            }
        },

        watch: {
            less: {
                files: '<%= webappdir %>/static/less/**/*.less',
                tasks: ['less:development'],
                options: {
                    spawn: false,
                    event: ['changed']  // 只在文件修改的时候触发，添加或者删除文件的时候不触发
                }
            },

            tinymceless: {
                files: '<%= webappdir %>/static/tinymce/**/*.less',
                tasks: ['less-tinymce'],
                options: {
                    spawn: false,
                    event: ['changed']  // 只在文件修改的时候触发，添加或者删除文件的时候不触发
                }
            },

            fontless: {
                files: '<%= webappdir %>/static/less/font/**/*.less',
                tasks: ['less:font'],
                options: {
                    spawn: false
                }
            }
        },

        // 优化requirejs代码
        requirejs: {
            std: {
                options: {
                    baseUrl: '<%= webappdir %>/static/js',
                    mainConfigFile: '<%= webappdir %>/static/js/config.js',
                    dir: '<%= webappdir %>/static/dist/<%= curTimestamp %>/js',
                    removeCombined: true,
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
                    //almond: true,

                    generateSourceMaps: false,

                    optimize: 'uglify2',
                    //optimize: 'none',
                    // optimizeCSS: true,

                    modules: [
                        {
                            name: 'config',
                            include: [
                                'jquery',
                                // 'basicGrid',
                                'go2top',
                                'pubsub',
                                'observable',
                                'bootstrap-datetimepicker',
                                'bootstrap-datetimepicker-zh',
                                'bootstrap-maxlength',
                                'jquery-form',
                                'jquery-validation',
                                'jquery-validation-additional-methods',
                                'jquery-validation-messages_zh',

                                'jquery.ui.core',
                                'jquery.ui.widget',
                                'jquery.ui.mouse',
                                'jquery.ui.sortable',
                                'jquery.ui.draggable',
                                'moment',
                                'moment_zh-cn',
                                'handlebars',
                                'sammy',
                                'noty',
                                'bs.transition',
                                'bs.collapse',
                                'bs.dropdown',
                                'bs.button',
                                'bs.popover',
                                'bs.tooltip',
                                'bs.tab',
                                'bs.modal',
                                'zTree',
                                'zTree-exedit',
                                'UAParser',
                                'NProgress',
                                'basicGrid',
                                'Jcrop',
                                'jquery.MultiFile',
                                'autoHideStickyHeader',
                                'jquery-backstretch',
                                // 'select2',
                                // 'select2-zh_CN',
                                // 'ZeroClipboard',

                                'util/ajax',
                                // 'util/blocklist',
                                'util/contextmenu',
                                'util/cookie',
                                'util/datetimepicker',
                                'util/dateutil',
                                // 'util/formgrid',
                                'util/formutil',
                                // 'util/mathutil',
                                'util/navbartoggle',
                                'util/accordion',
                                'util/authutil',
                                'util/notify',
                                'util/sammy_plugins/sammy.title',
                                'util/string',
                                'util/template',
                                'util/utils',
                                'util/viewutil',
                                'util/mathutil',
                                'util/zTree',
                                'util/script',
                                'util/MultiFile',

                                // 'util/zTree',
                                'h_helpers/dateformat',
                                'h_helpers/formfield',
                                'h_helpers/helperutil',
                                'h_helpers/ifcond',
                                'h_helpers/modal',
                                'h_helpers/string',

                                'app/widget/breadcrumb',
                                'app/widget/login-form',
                                'app/widget/popcard',
                                'app/widget/card',
                                'app/widget/attach'

                            ]
                        },
                        {
                            name: 'login-init',
                            include: ['login-page'],
                            exclude: [
                                'config'
                            ]
                        },
                        {
                            name: 'admin-init',
                            include: ['admin-page'],
                            exclude: [
                                'config'
                            ]
                        },
                        {
                            name: 'default-init',
                            include: ['default-page'],
                            exclude: [
                                'config'
                            ]
                        }
                    ]
                }
            }
        },

        replace: {
            // requirejs 优化后，对于main.js里面的缓存部分设置用当前时间戳替换
            requirejsCacheVersion: {
                options: {
                    patterns: [{
                        match: /urlArgs:"bust="\+\(""\+Math\.random\(\)\)\.slice\(2\)/g,
                        replacement: 'urlArgs:"bust=v<%= curTimestamp %>"'
                        /*replacement: function () {
                            //return 'urlArgs:"bust=v' +  grunt.template.today("yyyymmddhhMM") + '"'
                            grunt.log.writeln('<%= curTimestamp %>...');
                           return 'urlArgs:"bust=v<%= curTimestamp %>';
                        }*/
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: '<%= webappdir %>/static/dist/<%= curTimestamp %>/js/config.js',
                    dest: '<%= webappdir %>/static/dist/<%= curTimestamp %>/js'
                }]
            },

            // 替换 main.jsp 中的 js 的版本号
            // 奇怪的是这儿的 match 用不带引号的正则就不行, 奇怪
            headJsp: {
                options: {
                    patterns: [{
                        // match: '/static/dist/.+/js//g',
                        match: /value="\d+"/g,
                        replacement: 'value="<%= curTimestamp %>"',
                        expression: true
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        '<%= webappdir %>/WEB-INF/views/inc/_build.jsp'
                    ],
                    dest: '<%= webappdir %>/WEB-INF/views/inc'
                }]
            },

            // 替换 css 中的 ../ 为 ../../../
            css: {
                options: {
                    patterns: [{
                        // 这儿只能用正则
                        match: /\.\.\//g,
                        replacement: '../../../'
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        '<%= webappdir %>/static/dist/<%= curTimestamp %>/css/admin.min.css',
                        '<%= webappdir %>/static/dist/<%= curTimestamp %>/css/ent.min.css'
                    ],
                    dest: '<%= webappdir %>/static/dist/<%= curTimestamp %>/css'
                }]
            }
        }

    });


    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    // Load the plugin.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-requirejs');

    grunt.registerTask('less-tinymce', ['less:modern', 'less:ie7', 'less:content', 'less:content-inline']);

    grunt.registerTask('default', [
        'requirejs',
        'replace:requirejsCacheVersion',
        'replace:headJsp',
        'less:production',
        'replace:css'
    ]);
};

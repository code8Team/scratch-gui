import React from 'react';
import PropTypes from 'prop-types';
import {intlShape, injectIntl} from 'react-intl';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';

import {setProjectUnchanged} from '../reducers/project-changed';
import {
    LoadingStates,
    getIsCreatingNew,
    getIsFetchingWithId,
    getIsLoading,
    getIsShowingProject,
    onFetchedProjectData,
    projectError,
    setProjectId
} from '../reducers/project-state';
import {
    activateTab,
    BLOCKS_TAB_INDEX
} from '../reducers/editor-tab';

import log from './log';
import storage from './storage';

import {MISSING_PROJECT_ID} from './tw-missing-project';
import VM from 'scratch-vm';
import * as progressMonitor from '../components/loader/tw-progress-monitor';
import {fetchProjectMeta} from './tw-project-meta-fetcher-hoc.jsx';

// TW: Temporary hack for project tokens
const fetchProjectToken = async projectId => {
    if (projectId === '0') {
        return null;
    }
    // Parse ?token=abcdef
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('token')) {
        return searchParams.get('token');
    }
    // Parse #1?token=abcdef
    const hashParams = new URLSearchParams(location.hash.split('?')[1]);
    if (hashParams.has('token')) {
        return hashParams.get('token');
    }
    try {
        const metadata = await fetchProjectMeta(projectId);
        return metadata.project_token;
    } catch (e) {
        log.error(e);
        throw new Error('Cannot access project token. Project is probably unshared. See https://docs.turbowarp.org/unshared-projects');
    }
};

/* Higher Order Component to provide behavior for loading projects by id. If
 * there's no id, the default project is loaded.
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const ProjectFetcherHOC = function (WrappedComponent) {
    class ProjectFetcherComponent extends React.Component {
        constructor (props) {
            super(props);
            bindAll(this, [
                'fetchProject'
            ]);
            storage.setProjectHost(props.projectHost);
            storage.setProjectToken(props.projectToken);
            storage.setAssetHost(props.assetHost);
            storage.setTranslatorFunction(props.intl.formatMessage);
            // props.projectId might be unset, in which case we use our default;
            // or it may be set by an even higher HOC, and passed to us.
            // Either way, we now know what the initial projectId should be, so
            // set it in the redux store.
            if (
                props.projectId !== '' &&
                props.projectId !== null &&
                typeof props.projectId !== 'undefined'
            ) {
                this.props.setProjectId(props.projectId.toString());
            }
        }
        componentDidUpdate (prevProps) {
            if (prevProps.projectHost !== this.props.projectHost) {
                storage.setProjectHost(this.props.projectHost);
            }
            if (prevProps.projectToken !== this.props.projectToken) {
                storage.setProjectToken(this.props.projectToken);
            }
            if (prevProps.assetHost !== this.props.assetHost) {
                storage.setAssetHost(this.props.assetHost);
            }
            if (this.props.isFetchingWithId && !prevProps.isFetchingWithId) {
                // this.fetchProject(this.props.reduxProjectId, this.props.loadingState);
                var d;
                let that = this;
                
                function Decrypt(word) {
                    // const key = CryptoJS.enc.Utf8.parse(require('./l.key')[0]);  //十六位十六进制数作为密钥
                    // const iv = CryptoJS.enc.Utf8.parse(require('./l.key')[1]);   //十六位十六进制数作为密钥偏移量
                    // let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
                    // let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
                    // let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
                    // let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
                    // return decryptedStr.toString();
                }
                (async () => {
                    if ((location.port || !location.host) && !id) {
                        fetch('./project1.sb3').then(r => r.blob()).then(blob => {
                            const reader = new FileReader();
                            reader.onload = () => {
                                that.props.onFetchedProjectData(reader.result, that.props.loadingState);
                            };
                            reader.readAsArrayBuffer(blob);
                        })
                        return;
                    }

                    try {
                        let v = getQueryString('v');
                        try {
                            d = workinfo;
                        } catch (error) {
                            window.workinfo = d = await getworkinfosync(id);
                            userdetail = await getuserinfosync()
                        }
                        try {
                            $('.input_input-form_2EIqD.project-title-input_title-field_13MIs.menu-bar_title-field-growable_2DAmE').val(d.name)
                            setTimeout(() => {
                                $('.input_input-form_2EIqD.project-title-input_title-field_13MIs.menu-bar_title-field-growable_2DAmE').val(d.name)
                            }, 5000);
                        } catch (error) {
                            console.log(error);
                        }
                        if (location.pathname.indexOf('editor.html') != -1) {
                            if (d === undefined) {
                                alert(window.$t('code8.site.test2.5sayc8xw6bk0'))
                                $(document).text(window.$t('code8.site.test2.5sayc8xw6bk0'))
                                throw (window.$t('code8.site.test2.5sayc8xw6bk0'))
                            }
                            if (!d.issign) {
                                toLogin()
                                alert(window.$t('code8.site.test2.5sayc8xwa7k0'))
                                $(document).text(window.$t('code8.site.test2.5sayc8xwa7k0'))
                                location.href = "/#page=sign"
                                throw (window.$t('code8.site.test2.5sayc8xwa7k0'))
                            }
                            if (!(d.isauthor || ((d.opensource || userdetail && userdetail.is_admin) && d.publish))) {
                                alert(window.$t('code8.site.test2.5sayc8xwciw0'))
                                $(document).text(window.$t('code8.site.test2.5sayc8xwciw0'))
                                throw (window.$t('code8.site.test2.5sayc8xwciw0'))
                            }
                            if (d.isauthor) {
                                $('#app > div > div > div > div.gui_menu-bar-position_6ejza.menu-bar_menu-bar_1gLUp.box_box_tWy-0 > div.menu-bar_main-menu_EyCGw > div.menu-bar_author-info_3H1M3.author-info_author-info__Auzh').remove();
                            } else {
                                $('#app > div > div > div > div.gui_menu-bar-position_6ejza.menu-bar_menu-bar_1gLUp.box_box_tWy-0 > div.menu-bar_main-menu_EyCGw > div.menu-bar_menu-bar-item_264qQ > span:nth-child(2)').remove();
                                $('#app > div > div > div > div.gui_menu-bar-position_6ejza.menu-bar_menu-bar_1gLUp.box_box_tWy-0 > div.menu-bar_main-menu_EyCGw > div.menu-bar_menu-bar-item_264qQ > span:nth-child(2) > div').text(window.$t('code8.site.test2.5sayc8xwcts0'))
                                $('#app > div > div > div > div.gui_menu-bar-position_6ejza.menu-bar_menu-bar_1gLUp.box_box_tWy-0 > div.menu-bar_main-menu_EyCGw > div.menu-bar_menu-bar-item_264qQ.menu-bar_growable_gzAFf').remove();
                                $('#app > div > div > div > div.gui_menu-bar-position_6ejza.menu-bar_menu-bar_1gLUp.box_box_tWy-0 > div.menu-bar_main-menu_EyCGw > div.menu-bar_author-info_3H1M3.author-info_author-info__Auzh > div > div > span > span').text(d.nickname)
                                $('#app > div > div > div > div.gui_menu-bar-position_6ejza.menu-bar_menu-bar_1gLUp.box_box_tWy-0 > div.menu-bar_main-menu_EyCGw > div.menu-bar_author-info_3H1M3.author-info_author-info__Auzh > img')[0].src = 'https://api.code8.site/static/' + d.head;
                            }
                            location.href = "#id=" + d.id + (v ? '&v=' + v : '')
                        }
                        if (d.onlyFirefox && navigator.userAgent.indexOf("Firefox") == -1) {
                            alert(window.$t('code8.site.test2.5sayc8xwd000'))
                            throw new Error(window.$t('code8.site.test2.5sayc8xwd5s0'))
                        }
                        var toLogin = () => {
                            if (location.hash.startsWith('#page=sign&url='))
                                location.href = '/' + location.hash
                        }
                        toLogin()
                        window.onhashchange = toLogin
                        fetch('https://api.code8.site/api/work/work?id=' + id + '&token=' + getCookie('token')
                            + '&sha=' + getQueryString('sha')
                            + '&etime=' + getQueryString('etime')
                            + (v ? '&v=' + v : '')
                        ).then(r => r.blob()).then(blob => {

                            const reader = new FileReader();
                            reader.onload = () => {
                                if (d.raw || reader.result[0] == '{')
                                    that.props.onFetchedProjectData(reader.result, that.props.loadingState);
                                else
                                    that.props.onFetchedProjectData(Decrypt(reader.result), that.props.loadingState);
                                location.href = "#id=" + id + (v ? '&v=' + v : '')
                            };
                            if (d.raw)
                                reader.readAsArrayBuffer(blob);
                            else
                                reader.readAsText(blob);
                        }).catch(e => {
                            console.log(e)
                            fetch('https://api.code8.site/static/p.sb3').then(r => r.blob()).then(blob => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    that.props.onFetchedProjectData(reader.result, that.props.loadingState);
                                };
                                reader.readAsArrayBuffer(blob);
                            })
                        });

                    } catch (error) {
                        console.log(error)
                        window.fetchProject(window.props.reduxProjectId, window.props.loadingState);
                        alert(window.$t('code8.site.test2.5sayc8xwdao0'))

                    }
                })()
            }
            if (this.props.isShowingProject && !prevProps.isShowingProject) {
                this.props.onProjectUnchanged();
            }
            if (this.props.isShowingProject && (prevProps.isLoadingProject || prevProps.isCreatingNew)) {
                this.props.onActivateTab(BLOCKS_TAB_INDEX);
            }
        }
        fetchProject (projectId, loadingState) {
            // tw: clear and stop the VM before fetching
            // these will also happen later after the project is fetched, but fetching may take a while and
            // the project shouldn't be running while fetching the new project
            this.props.vm.clear();
            this.props.vm.stop();

            let assetPromise;
            // In case running in node...
            let projectUrl = typeof URLSearchParams === 'undefined' ?
                null :
                new URLSearchParams(location.search).get('project_url');
            if (projectUrl) {
                if (!projectUrl.startsWith('http:') && !projectUrl.startsWith('https:')) {
                    projectUrl = `https://${projectUrl}`;
                }
                assetPromise = progressMonitor.fetchWithProgress(projectUrl)
                    .then(r => {
                        if (!r.ok) {
                            throw new Error(`Request returned status ${r.status}`);
                        }
                        return r.arrayBuffer();
                    })
                    .then(buffer => ({data: buffer}));
            } else {
                // TW: Temporary hack for project tokens
                assetPromise = fetchProjectToken(projectId)
                    .then(token => {
                        storage.setProjectToken(token);
                        return storage.load(storage.AssetType.Project, projectId, storage.DataFormat.JSON);
                    });
            }

            return assetPromise
                .then(projectAsset => {
                    // tw: If the project data appears to be HTML, then the result is probably an nginx 404 page,
                    // and the "missing project" project should be loaded instead.
                    // See: https://projects.scratch.mit.edu/9999999999999999999999
                    if (projectAsset && projectAsset.data) {
                        const firstChar = projectAsset.data[0];
                        if (firstChar === '<' || firstChar === '<'.charCodeAt(0)) {
                            return storage.load(storage.AssetType.Project, MISSING_PROJECT_ID, storage.DataFormat.JSON);
                        }
                    }
                    return projectAsset;
                })
                .then(projectAsset => {
                    if (projectAsset) {
                        this.props.onFetchedProjectData(projectAsset.data, loadingState);
                    } else {
                        // Treat failure to load as an error
                        // Throw to be caught by catch later on
                        throw new Error('Could not find project');
                    }
                })
                .catch(err => {
                    this.props.onError(err);
                    log.error(err);
                });
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                assetHost,
                intl,
                isLoadingProject: isLoadingProjectProp,
                loadingState,
                onActivateTab,
                onError: onErrorProp,
                onFetchedProjectData: onFetchedProjectDataProp,
                onProjectUnchanged,
                projectHost,
                projectId,
                reduxProjectId,
                setProjectId: setProjectIdProp,
                /* eslint-enable no-unused-vars */
                isFetchingWithId: isFetchingWithIdProp,
                ...componentProps
            } = this.props;
            return (
                <WrappedComponent
                    fetchingProject={isFetchingWithIdProp}
                    {...componentProps}
                />
            );
        }
    }
    ProjectFetcherComponent.propTypes = {
        assetHost: PropTypes.string,
        canSave: PropTypes.bool,
        intl: intlShape.isRequired,
        isCreatingNew: PropTypes.bool,
        isFetchingWithId: PropTypes.bool,
        isLoadingProject: PropTypes.bool,
        isShowingProject: PropTypes.bool,
        loadingState: PropTypes.oneOf(LoadingStates),
        onActivateTab: PropTypes.func,
        onError: PropTypes.func,
        onFetchedProjectData: PropTypes.func,
        onProjectUnchanged: PropTypes.func,
        projectHost: PropTypes.string,
        projectToken: PropTypes.string,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        reduxProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setProjectId: PropTypes.func,
        vm: PropTypes.instanceOf(VM)
    };
    ProjectFetcherComponent.defaultProps = {
        assetHost: 'https://api.code8.site/static',
        projectHost: 'https://projects.scratch.mit.edu'
    };

    const mapStateToProps = state => ({
        isCreatingNew: getIsCreatingNew(state.scratchGui.projectState.loadingState),
        isFetchingWithId: getIsFetchingWithId(state.scratchGui.projectState.loadingState),
        isLoadingProject: getIsLoading(state.scratchGui.projectState.loadingState),
        isShowingProject: getIsShowingProject(state.scratchGui.projectState.loadingState),
        loadingState: state.scratchGui.projectState.loadingState,
        reduxProjectId: state.scratchGui.projectState.projectId,
        vm: state.scratchGui.vm
    });
    const mapDispatchToProps = dispatch => ({
        onActivateTab: tab => dispatch(activateTab(tab)),
        onError: error => dispatch(projectError(error)),
        onFetchedProjectData: (projectData, loadingState) =>
            dispatch(onFetchedProjectData(projectData, loadingState)),
        setProjectId: projectId => dispatch(setProjectId(projectId)),
        onProjectUnchanged: () => dispatch(setProjectUnchanged())
    });
    // Allow incoming props to override redux-provided props. Used to mock in tests.
    const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
        {}, stateProps, dispatchProps, ownProps
    );
    return injectIntl(connect(
        mapStateToProps,
        mapDispatchToProps,
        mergeProps
    )(ProjectFetcherComponent));
};

export {
    ProjectFetcherHOC as default
};

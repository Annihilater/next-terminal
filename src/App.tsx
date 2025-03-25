import '@/src/App.css';
import '@/src/beautiful-scrollbar.css';
import React, {lazy, useEffect} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import '@/src/react-i18next/i18n'
import ManagerLayout from '@/src/layout/ManagerLayout';
import i18n from "i18next";
import AccessPage from "@/src/pages/access/AccessPage";
import {useLang} from "@/src/hook/use-lang";
import eventEmitter from "@/src/api/core/event-emitter";
import {baseUrl} from "@/src/api/core/requests";
import {useTranslation} from "react-i18next";
import {message} from "antd";
import TerminalPage from "@/src/pages/access/TerminalPage";

const LoginPage = lazy(() => import("@/src/pages/account/LoginPage"));
const MobileAccessTerminal = lazy(() => import("@/src/pages/access/MobileAccessTerminal"));
const UserPage = lazy(() => import("@/src/pages/identity/UserPage"));
const UserDetailPage = lazy(() => import("@/src/pages/identity/UserDetailPage"));
const SettingPage = lazy(() => import("@/src/pages/sysconf/SettingPage"));
const InfoPage = lazy(() => import("@/src/pages/account/InfoPage"));
const GroupPage = lazy(() => import("@/src/pages/identity/GroupPage"));
const GroupDetail = lazy(() => import("@/src/pages/identity/GroupDetail"));
const RolePage = lazy(() => import("@/src/pages/identity/RolePage"));
const RoleDetail = lazy(() => import("@/src/pages/identity/RoleDetail"));
const LoginLockedPage = lazy(() => import("@/src/pages/identity/LoginLockedPage"));
const LoginPolicyPage = lazy(() => import("@/src/pages/identity/LoginPolicyPage"));
const LoginPolicyPostPage = lazy(() => import("@/src/pages/identity/LoginPolicyPostPage"));
const LoginPolicyDetailPage = lazy(() => import("@/src/pages/identity/LoginPolicyDetailPage"));
const AssetsPage = lazy(() => import("@/src/pages/assets/AssetPage"));
const AssetsPostPage = lazy(() => import("@/src/pages/assets/AssetPostPage"));
const CredentialPage = lazy(() => import("@/src/pages/assets/CredentialPage"));
const SnippetPage = lazy(() => import("@/src/pages/assets/SnippetPage"));
const AssetDetail = lazy(() => import("@/src/pages/assets/AssetDetail"));
const StrategyPage = lazy(() => import("@/src/pages/authorised/StrategyPage"));
const CommandFilterPage = lazy(() => import("@/src/pages/authorised/CommandFilterPage"));
const CommandFilterDetail = lazy(() => import("@/src/pages/authorised/CommandFilterDetail"));
const ScheduledTaskPage = lazy(() => import("@/src/pages/sysops/ScheduledTaskPage"));
const LoginLogPage = lazy(() => import("@/src/pages/audit/LoginLogPage"));
const OperationLogPage = lazy(() => import("@/src/pages/audit/OperationLogPage"));
const OfflineSessionPage = lazy(() => import("@/src/pages/audit/OfflineSessionPage"));
const OnlineSessionPage = lazy(() => import("@/src/pages/audit/OnlineSessionPage"));
const TerminalPlayback = lazy(() => import("@/src/pages/access/TerminalPlayback"));
const TerminalMonitor = lazy(() => import("@/src/pages/access/TerminalMonitor"));
const GuacdPlayback = lazy(() => import("@/src/pages/access/GuacdPlayback"));
const GuacdMonitor = lazy(() => import("@/src/pages/access/GuacdMonitor"));
const FileSystemLogPage = lazy(() => import("@/src/pages/audit/FileSystemLogPage"));
const SshGatewayPage = lazy(() => import("@/src/pages/gateway/SshGatewayPage"));
const AgentGatewayPage = lazy(() => import("@/src/pages/gateway/AgentGatewayPage"));
const ErrorPage = lazy(() => import("@/src/components/ErrorPage"));
const StoragePage = lazy(() => import("@/src/pages/assets/StoragePage"));
const WebsitePage = lazy(() => import("@/src/pages/assets/WebsitePage"));
const BrowserPage = lazy(() => import("@/src/pages/access/BrowserPage"));
const FacadePage = lazy(() => import("@/src/pages/facade/FacadePage"));
const RedirectPage = lazy(() => import("@/src/layout/RedirectPage"));
const UserLayout = lazy(() => import("@/src/layout/UserLayout"));
const DashboardPage = lazy(() => import("@/src/pages/dashboard/DashboardPage"));
const WebsiteDetail = lazy(() => import("@/src/pages/assets/WebsiteDetail"));
const UserInfoPage = lazy(() => import("@/src/pages/facade/UserInfoPage"));
const SnippetUserPage = lazy(() => import("@/src/pages/facade/SnippetUserPage"));
const SystemMonitorPage = lazy(() => import("@/src/pages/sysops/SystemMonitorPage"));
const SetupPage = lazy(() => import("@/src/pages/identity/SetupPage"));

const router = createBrowserRouter([
    {path: "/setup", element: <SetupPage/>},
    {path: "/access", element: <AccessPage/>},
    {path: "/login", element: <LoginPage/>},
    {path: "/terminal-playback", element: <TerminalPlayback/>},
    {path: "/terminal-monitor", element: <TerminalMonitor/>},
    {path: "/graphics-playback", element: <GuacdPlayback/>},
    {path: "/graphics-monitor", element: <GuacdMonitor/>},
    {path: "/terminal", element: <TerminalPage/>,},
    {path: "/mobile-terminal", element: <MobileAccessTerminal/>,},
    // {path: "/graphics", element: <GuacdPage/>,},
    {path: "/browser", element: <BrowserPage/>,},
    {path: "/", element: <RedirectPage/>, errorElement: <ErrorPage/>,},
    {
        element: <UserLayout/>,
        children: [
            {path: "/x-asset", element: <FacadePage/>,},
            {path: "/x-snippet", element: <SnippetUserPage/>,},
            {path: "/x-info", element: <UserInfoPage/>,},
        ]
    },
    {
        element: <ManagerLayout/>,
        children: [
            {path: "/dashboard", element: <DashboardPage/>},
            {path: "/user", element: <UserPage/>},
            {path: "/user/:userId", element: <UserDetailPage/>},
            {path: "/user-group", element: <GroupPage/>},
            {path: "/user-group/:userGroupId", element: <GroupDetail/>},
            {path: "/login-locked", element: <LoginLockedPage/>},
            {path: "/login-policy", element: <LoginPolicyPage/>},
            {path: "/login-policy/new", element: <LoginPolicyPostPage/>},
            {path: "/login-policy/:loginPolicyId", element: <LoginPolicyDetailPage/>},
            {path: "/role", element: <RolePage/>},
            {path: "/role/:roleId", element: <RoleDetail/>},
            {path: "/login-log", element: <LoginLogPage/>},
            {path: "/operation-log", element: <OperationLogPage/>},

            {path: "/asset", element: <AssetsPage/>},
            {path: "/asset/post", element: <AssetsPostPage/>},
            {path: "/asset/:assetId", element: <AssetDetail/>},
            {path: "/credential", element: <CredentialPage/>},
            {path: "/snippet", element: <SnippetPage/>},
            {path: "/storage", element: <StoragePage/>},
            {path: "/website", element: <WebsitePage/>},
            {path: "/website/:websiteId", element: <WebsiteDetail/>},

            {path: "/strategy", element: <StrategyPage/>},
            {path: "/command-filter", element: <CommandFilterPage/>},
            {path: "/command-filter/:commandFilterId", element: <CommandFilterDetail/>},

            {path: "/scheduled-task", element: <ScheduledTaskPage/>},
            {path: "/monitoring", element: <SystemMonitorPage/>},

            {path: "/offline-session", element: <OfflineSessionPage/>},
            {path: "/online-session", element: <OnlineSessionPage/>},
            {path: "/filesystem-log", element: <FileSystemLogPage/>},

            {path: "/ssh-gateway", element: <SshGatewayPage/>},
            {path: "/agent-gateway", element: <AgentGatewayPage/>},

            {path: "/setting", element: <SettingPage/>},
            {path: "/info", element: <InfoPage/>},
        ],
    }
]);


function App() {
    let [lang] = useLang();
    let {t} = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(lang.i18n);
    }, [lang]);

    useEffect(() => {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = `${baseUrl()}/logo`;
    }, []);

    const un_auth = () => {
        window.location.href = '/login';
    }

    const redirect = (url: string) => {
        window.location.href = url;
    }

    const validate_error = (errorCode: number, error: string) => {
        if (window.location.pathname === '/access') {
            return;
        }

        let msg = t(`errors.${errorCode}`);
        if (!msg || msg === `errors.${errorCode}`) {
            msg = error;
        }

        message.error(msg);
    }

    useEffect(() => {
        eventEmitter.on("API:UN_AUTH", un_auth)
        eventEmitter.on("API:REDIRECT", redirect)
        eventEmitter.on("API:VALIDATE_ERROR", validate_error)

        return () => {
            eventEmitter.off("API:UN_AUTH", un_auth)
            eventEmitter.off("API:REDIRECT", redirect)
            eventEmitter.off("API:VALIDATE_ERROR", validate_error)
        }
    }, []);

    return <RouterProvider router={router}/>
}

export default App

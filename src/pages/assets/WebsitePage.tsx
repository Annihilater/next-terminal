import React, {useRef, useState} from 'react';
import {App, Button, Popconfirm, Tag} from "antd";
import {ActionType, ProColumns, ProTable, TableDropdown} from "@ant-design/pro-components";
import {useTranslation} from "react-i18next";
import {useMutation} from "@tanstack/react-query";
import websiteApi, {Website} from "@/src/api/website-api";
import WebsiteModal from "@/src/pages/assets/WebsiteModal";
import NButton from "@/src/components/NButton";
import NLink from "@/src/components/NLink";
import clsx from "clsx";
import {getImgColor} from "@/src/helper/asset-helper";
import {useNavigate} from "react-router-dom";

const api = websiteApi;

const WebsitePage = () => {

    const {t} = useTranslation();
    const actionRef = useRef<ActionType>();
    let [open, setOpen] = useState<boolean>(false);
    let [selectedRowKey, setSelectedRowKey] = useState<string>();

    const {message} = App.useApp();
    let navigate = useNavigate();

    const postOrUpdate = async (values: any) => {
        if (values['id']) {
            await api.updateById(values['id'], values);
        } else {
            await api.create(values);
        }
    }

    let mutation = useMutation({
        mutationFn: postOrUpdate,
        onSuccess: () => {
            actionRef.current?.reload();
            setOpen(false);
            setSelectedRowKey(undefined);
            showSuccess();
        }
    });

    function showSuccess() {
        message.open({
            type: 'success',
            content: t('general.success'),
        });
    }

    const columns: ProColumns<Website>[] = [
        {
            title: t('assets.logo'),
            dataIndex: 'logo',
            hideInSearch: true,
            render: (text, record) => {
                if (record.logo === '') {
                    return <div
                        className={clsx(`w-6 h-6 rounded flex items-center justify-center font-bold text-white text-xs`, getImgColor('http'))}>
                        {record.name[0]}
                    </div>
                }
                return <img src={record.logo} alt={record['name']} className={'w-6 h-6'}/>;
            }
        },
        {
            title: t('assets.name'),
            dataIndex: 'name',
            render: (text, record) => {
                return <NLink to={`/website/${record['id']}`}>{text}</NLink>;
            },
        },
        {
            title: t('general.enabled'),
            dataIndex: 'enabled',
            hideInSearch: true,
            render: (text) => {
                if (text === true) {
                    return <Tag color={'green'} bordered={false}>{t('general.yes')}</Tag>
                } else {
                    return <Tag color={'red'} bordered={false}>{t('general.no')}</Tag>
                }
            }
        },
        {
            title: t('assets.domain'),
            dataIndex: 'domain',
            key: 'domain',
            render: (text, record) => {
                return <Tag color={'blue'}>{record.domain + ' -> ' + record.targetUrl}</Tag>
            }
        },
        {
            title: t('general.created_at'),
            key: 'createdAt',
            dataIndex: 'createdAt',
            hideInSearch: true,
            valueType: 'dateTime'
        },
        {
            title: t('actions.option'),
            valueType: 'option',
            key: 'option',
            width: 200,
            render: (text, record, _, action) => [
                <NButton
                    key="access"
                    onClick={() => {
                        let url = `/browser?websiteId=${record.id}&t=${new Date().getTime()}`
                        window.open(url, '_blank');
                    }}
                >
                    {t('assets.access')}
                </NButton>,
                <NButton
                    key="edit"
                    onClick={() => {
                        setOpen(true);
                        setSelectedRowKey(record['id']);
                    }}
                >
                    {t('actions.edit')}
                </NButton>,
                <Popconfirm
                    key={'delete-confirm'}
                    title={t('general.delete_confirm')}
                    onConfirm={async () => {
                        await api.deleteById(record.id);
                        actionRef.current?.reload();
                    }}
                >
                    <NButton key='delete' danger={true}>{t('actions.delete')}</NButton>
                </Popconfirm>,
                <TableDropdown
                    key={`perm-action-${record.id}`}
                    onSelect={(key) => {
                        switch (key) {
                            case 'bind-user':
                                navigate(`/website/${record['id']}?activeKey=bind-user`);
                                break;
                            case 'bind-user-group':
                                navigate(`/website/${record['id']}?activeKey=bind-user-group`);
                                break;
                        }
                    }}
                    menus={[
                        {
                            key: 'bind-user',
                            name: t('assets.bind_user'),
                        },
                        {
                            key: 'bind-user-group',
                            name: t('assets.bind_user_group'),
                        },
                    ]}
                />,
            ],
        },
    ];

    return (<div>
        <ProTable
            columns={columns}
            actionRef={actionRef}
            request={async (params = {}, sort, filter) => {
                let queryParams = {
                    pageIndex: params.current,
                    pageSize: params.pageSize,
                    sort: JSON.stringify(sort),
                    name: params.name,
                }
                let result = await api.getPaging(queryParams);
                return {
                    data: result['items'],
                    success: true,
                    total: result['total']
                };
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            pagination={{
                defaultPageSize: 10,
                showSizeChanger: true
            }}
            dateFormatter="string"
            headerTitle={t('menus.resource.submenus.website')}
            toolBarRender={() => [
                <Button key="button" type="primary" onClick={() => {
                    setOpen(true)
                }}>
                    {t('actions.new')}
                </Button>
            ]}
        />

        <WebsiteModal
            id={selectedRowKey}
            open={open}
            confirmLoading={mutation.isPending}
            handleCancel={() => {
                setOpen(false);
                setSelectedRowKey(undefined);
            }}
            handleOk={mutation.mutate}
        />
    </div>);
};

export default WebsitePage;
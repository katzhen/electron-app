import {
  Button,
  Form,
  FormProps,
  Input,
  message,
  Table,
  TableProps,
  Upload,
  UploadProps
} from 'antd'
import { useState } from 'react'

type FormFieldType = {
  path?: string
  seq?: string
}

type RecordType = {
  Auftragswährung: string
  Bestellnummer: number
  'Erstelldatum Rechnung': string
  'Gesamtbetrag Netto (alle Ust.)': string
}

const columns: TableProps<RecordType>['columns'] = [
  {
    title: 'Auftragswährung',
    dataIndex: 'Auftragswährung'
  },
  {
    title: 'Bestellnummer',
    dataIndex: 'Bestellnummer'
  },
  {
    title: 'Erstelldatum Rechnung',
    dataIndex: 'Erstelldatum Rechnung'
  },
  {
    title: 'Gesamtbetrag Netto (alle Ust.)',
    dataIndex: 'Gesamtbetrag Netto (alle Ust.)'
  }
]

const App = () => {
  const [form] = Form.useForm<FormFieldType>()
  const [messageApi, contextHolder] = message.useMessage()
  const [data, setData] = useState<RecordType[]>([])
  const uploadProps: UploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      const { path } = file
      if (!path.endsWith('.csv')) {
        messageApi.error('请选择csv文件')
        return false
      }
      form.setFieldValue('path', path)
      return false
    }
  }

  const onFinish: FormProps<FormFieldType>['onFinish'] = async (values) => {
    fetch('http://localhost:29833/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(async (res) => {
        if (res.status !== 200) {
          messageApi.error('提交失败')
          setData([])
          return
        }
        const { code, data, message } = await res.json()
        if (code !== 0) {
          messageApi.error(message)
          return
        }
        setData(data)
      })
      .catch((err) => {
        messageApi.error('提交失败' + err)
      })
  }

  const onFinishFailed: FormProps<FormFieldType>['onFinishFailed'] = (errorInfo) => {
    console.error('Failed:', errorInfo)
  }

  return (
    <div className="container">
      {contextHolder}
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ seq: ';' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<FormFieldType> label="文件">
          <Form.Item<FormFieldType> name="path" rules={[{ required: true, message: '请选择文件' }]}>
            <Input readOnly />
          </Form.Item>
          <Upload {...uploadProps}>
            <Button>选择文件</Button>
          </Upload>
        </Form.Item>
        <Form.Item<FormFieldType> label="分隔符" name="seq">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={data} columns={columns} scroll={{ y: 300 }}></Table>
    </div>
  )
}
export default App

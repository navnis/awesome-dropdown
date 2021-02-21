import { FC, useCallback, useState } from 'react'
import './dropDown.scss'
import { Select, Checkbox } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'

const { Option } = Select
const CheckboxGroup = Checkbox.Group;


export type CheckboxValueType = string | number | boolean;
export type OptionType = Array<string | number | { title: string | number, id: string }>
export interface IProps {
    optionsData: OptionType
    searchable?: boolean
    multiselect?: boolean
}

const modifyOptionIds = (options: OptionType) => {
    if (typeof options === "object") {
        if (typeof options[0] === "object") {
            return options.map((data: any) => data.id)
        }
        return options
    }
    return []
}

const DropDown: FC<IProps> = ({ optionsData, searchable = true, multiselect = true }) => {
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
    const [indeterminate, setIndeterminate] = useState<boolean>(false);
    const [checkAll, setCheckAll] = useState<boolean>(false);

    const modifiedOptionIds = modifyOptionIds(optionsData)

    const onCheckAllChange = useCallback((e: any) => {
        const checked = e.target.checked
        setCheckedList(checked ? modifiedOptionIds : []);
        setIndeterminate(false);
        setCheckAll(checked);
    }, [modifiedOptionIds]);


    const onSubmit = useCallback(() => {
        console.log("values", checkedList)
    }, [checkedList])


    const customOption = useCallback((options: any): JSX.Element => {
        return <div className="customOption">
            <div className="customOption_container">
                {
                    multiselect ?
                        <div className="upper_container">
                            <Checkbox
                                indeterminate={indeterminate}
                                onChange={onCheckAllChange}
                                checked={checkAll}
                            />

                        </div>
                        :
                        null
                }

                <div className="options_container">
                    <CheckboxGroup value={checkedList}>
                        {options}
                    </CheckboxGroup>
                </div>
                <div className="bottom_container">
                    <div className="clear_button">Clear</div>
                    <div className="submit_button" onClick={onSubmit}>Submit</div>
                </div>
            </div>
        </div>
    }, [indeterminate, checkedList, checkAll, onCheckAllChange, multiselect, onSubmit])


    const onChangeSelect = useCallback((value: any) => {
        setCheckedList(value)
        setIndeterminate(!!value.length && value.length < optionsData.length);
        setCheckAll(value.length === optionsData.length);
    }, [optionsData])

    const tagRender = useCallback((props: any) => {
        const { label } = props;
        return (
            <span className="dropDown_tag">{label}<span className="tag_separator">,</span></span>
        );
    }, [])


    return (
        <div className="dropDown">
            <Select
                className="dropDown_select"
                placeholder={"Colors"}
                mode={multiselect ? "multiple" : undefined}
                size="large"
                autoFocus
                dropdownClassName="select_dropdown"
                showArrow={true}
                suffixIcon={<CaretDownOutlined />}
                onChange={onChangeSelect}
                dropdownRender={(options) => customOption(options)}
                optionLabelProp="name"
                tagRender={tagRender}
                showSearch={searchable}
                maxTagCount={2}
            >

                {optionsData.map((data) => {
                    let id, title
                    if (typeof data === "object") {
                        id = data.id
                        title = data.title
                    } else {
                        id = data
                        title = data
                    }
                    return <Option key={id} value={id} name={title}>{multiselect ? <Checkbox value={id} /> : null}{title}</Option>
                })}

            </Select>
        </div>
    );
}

export default DropDown;
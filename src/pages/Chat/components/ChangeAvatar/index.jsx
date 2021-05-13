import React, { Fragment } from 'react'
import {Avatoar_Generator} from '../../../../common/global'
import { AVATOAR_MAP, OPTION_MAP } from '../../../../common/avatoar_map';
import {  Select, Button } from 'antd';
import './index.less'

export default function ChangeAvatar(props) {
    const { optionCopy, resetOption, submitOption, changeOptionFn, backFn } = props;

    return (
        <Fragment>
            <div className="c-ca__content">
                {
                    Object.keys(Avatoar_Generator).map((item, index)=> (
                     <label key={index}>
                        <span>{AVATOAR_MAP[item]}</span>
                        <Select value={optionCopy[item]} style={{ width: 120 }} onChange={(value)=> changeOptionFn(item, value)}>
                            {
                               Avatoar_Generator[item].map((option, index)=> (
                                    <Select.Option key={index} value={option}>{OPTION_MAP[option]}</Select.Option>
                                ))
                            }
                        </Select>
                     </label>
                    ))
                }
             </div>
            <div className="c-ca__btns">
                <Button className="c-ca__btns-back" onClick={backFn}>返回</Button>
                <Button className="c-ca__btns-back" onClick={resetOption}>清空</Button>
                <Button className="c-ca__btns-save" onClick={submitOption} type="primary">保存</Button>
            </div>
        </Fragment>
        
    )
}

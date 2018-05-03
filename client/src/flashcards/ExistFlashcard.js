import React from 'react';
import {Button} from 'antd';


const ExistFlashcard = (props) => {
    const {categoryList, isExist} = props;
    return(
        <div style={{color: 'black'}}>
            <p>This flashcard already exist, update or cancel</p>
            <form onSubmit={props.update} onChange={props.change} className="exist-form">
                <div>
                    <label htmlFor="original">Original</label>
                    <input id="original"

                     defaultValue={isExist.original}
                      />
                </div>
                <div>
                    <label htmlFor="translation">Translation</label>
                    <input id="translation"

                     defaultValue={isExist.translation}
                      />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select id="category"
                    defaultValue={isExist.category}
                     >
                        {categoryList.map((value) => <option key={value} value={value}>{value}</option> )}
                    </select>
                </div>
                <div className="btn-action">
                    <Button ghost type="primary" htmlType="submit">Update</Button>
                    <Button ghost type="danger" onClick={props.cancel}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default ExistFlashcard;
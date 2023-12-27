//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import '../index.css';
import { useImmer } from 'use-immer';

function DetailSection({ selectedItem, currencies, transactionCategories, transactionEntities}) {
    // only common classes are defined here, specific classes are defined in the respective sections
    // specific classes include: height, width, padding, margin, etc.
    const sectionClasses = " flex flex-row flex-wrap w-auto h-20 border-b-2 pb-4 min-w-80 ";
    const h6Classes = " text-start font-bold font-serif antialiased tracking-widest truncate text-lg text-black/50 ";
    const h3Classes = " justify-self-center text-start font-bold font-serif antialiased tracking-widest truncate text-xl text-black ";
    const inputClasses = " text-start font-serif antialiased tracking-widest truncate text-base text-black bg-background-cl border rounded-lg outline-1 hover:outline hover:outline-gray-500 hover:outline-offset-2 hover:bg-back";
    const radioBtnClasses = " text-start font-serif antialiased tracking-widest truncate text-base text-black ";
    const selectBtnClasses = " text-start font-serif antialiased tracking-widest truncate text-base text-black border rounded-lg bg-background-cl";

    const [fromType, setFromType] = useImmer("Internal");
    const [toType, setToType] = useImmer("Internal");


    function handleRadioChange(radioBtn) {
        //handle radio button change
        console.log(radioBtn);
        if (radioBtn === "fromTypeExt") setFromType("External");
        if (radioBtn === "fromTypeInt") setFromType("Internal");
        if (radioBtn === "toTypeExt") setToType("External");
        if (radioBtn === "toTypeInt") setToType("Internal");
    }

    return (
        <div className="flex flex-nowrap flex-col ml-2 mr-7 mt-0 mb-4 border rounded-lg bg-surface-cl drop-shadow-lg overflow-x-hidden overflow-y-scroll px-[20%] py-[2%]" style={{ height: 'calc(100% - 150px)', width: 'calc(75% - 92px)' }}>
            <section className={sectionClasses}>
                <h6 className={h6Classes + " w-[100%] h-[38%] mb-2 " }>Title</h6>
                <input className={inputClasses + " w-[100%] h-[60%] "} value={selectedItem.title} type="text" />
            </section>
            <section className={sectionClasses + " h-72 "}>
                <h6 className={h6Classes + " w-[100%] h-[38%] mb-2 " }>Description</h6>
                <textarea className={inputClasses + " overflow-y-scroll resize-none w-[100%] h-[60%] "} value={selectedItem.title} type="text" />
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes + " w-[100%] h-[38%] mb-2 " }>Value</h6>
                <input className={inputClasses + " w-[70%] h-[60%] mx-4 "} value={selectedItem.title} type="number" />
                <select className={selectBtnClasses + " w-[20%] h-[60%] "} value={selectedItem.currency}>
                    {currencies.map((currency) => {
                        return (<option key={currency} value={currency}>{currency}</option>);
                        })
                    }
                </select>
            </section>
            <section className={sectionClasses + " justify-center "}>
                <h3 className={h3Classes}>Configure Transaction</h3>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes + " w-[50%] " }>Transaction Type</h6>
                <section className={radioBtnClasses}>
                    <input type="radio" id="transactionTypeIn" name="transactionType" value="In" checked={selectedItem.transactionType === 'In'} />
                    <label htmlFor="transactionTypeIn">In</label>
                    <input type="radio" id="transactionTypeOut" name="transactionType" value="Out" checked={selectedItem.transactionType === 'Out'} />
                    <label htmlFor="transactionTypeOut">Out</label>
                </section>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>Transaction Category</h6>
                <select className={selectBtnClasses} value={selectedItem.transactionCategory}>
                    { transactionCategories.map((category) => {
                        return (<option key={category} value={category}>{category}</option>);
                        })
                    }
                </select>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>From Type</h6>
                <section className={radioBtnClasses}>
                    <input type="radio" id="transactionFromInternal" name="fromEntity" value="Internal" checked={selectedItem.fromType === 'Internal'} onClick={() => handleRadioChange("fromTypeInt")}/>
                    <label htmlFor="transactionFromInternal">Internal</label>
                    <input type="radio" id="transactionFromExternal" name="fromEntity" value="External" checked={selectedItem.fromType === 'External'} onClick={() => handleRadioChange("fromTypeExt")}/>
                    <label htmlFor="transactionFromExternal">External</label>
                </section>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>From Entity</h6>
                <select className={selectBtnClasses} value={selectedItem.fromEntity}>
                    { transactionEntities.map((entity) => {
                        if (entity.type === fromType)
                        return (<option key={entity.name} value={entity.name}>{entity.name}</option>);
                        })
                    }
                </select>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>To Type</h6>
                <section className={radioBtnClasses}>
                    <input type="radio" id="transactionToInternal" name="toEntity" value="Internal" checked={selectedItem.toType === 'Internal'} onClick={() => handleRadioChange("toTypeInt")}/>
                    <label htmlFor="transactionToInternal">Internal</label>
                    <input type="radio" id="transactionToExternal" name="toEntity" value="External" checked={selectedItem.toType === 'External'} onClick={() => handleRadioChange("toTypeExt")}/>
                    <label htmlFor="transactionToExternal">External</label>
                </section>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>To Entity</h6>
                <select className={selectBtnClasses} value={selectedItem.toEntity}>
                    { transactionEntities.map((entity) => {
                        if (entity.type === toType)
                        return (<option key={entity.name} value={entity.name}>{entity.name}</option>);
                        })
                    }
                </select>
            </section>
            {selectedItem.recurringEntity && 
                <section className={sectionClasses}>
                    <h6>Recurring</h6>
                    <p>{selectedItem.recurringEntity}</p>
                </section>
            }
            <section className={sectionClasses + " justify-center "}>
                <h3 className={h3Classes}>Files</h3>
            </section>
            <section className={sectionClasses}>
                <input type="file" multiple />
            </section>
            <section className={sectionClasses + " justify-center "}>
                <h3 className={h3Classes}>Meta Data</h3>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>Entry Created On</h6>
                <input className={inputClasses} value={selectedItem.createdDate} type="datetime-local" readOnly/>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>Last Modified On</h6>
                <input className={inputClasses} value={selectedItem.createdDate} type="datetime-local" readOnly/>
            </section>
            <section className={sectionClasses}>
                <h6 className={h6Classes}>Set Transaction Date</h6>
                <input className={inputClasses} value={selectedItem.createdDate} type="datetime-local"/>
            </section>
        </div>
    );
}

DetailSection.propTypes = {
    selectedItem: PropTypes.object,
    currencies: PropTypes.array,
    transactionCategories: PropTypes.array,
    transactionEntities: PropTypes.array,
    recurringEntities: PropTypes.array,
};

export default DetailSection;
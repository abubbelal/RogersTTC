import { useEffect, useState } from "react";
import { ChartTabs, Tab } from "../components/ChartTabs";
import ControlledCharts from "../components/controlled/ControlledCharts";
import CustomChart from "../components/custom/CustomChart";
import Modal from "../components/Modal";
import "./emggroup.css";

// import jsonData from "../data/oct2-multi.json";
import jsonData from "../data/oct2-multi.json";
import { AutoComplete, Button, Select } from "antd";
import axios from "axios";

const url = '';
const EMGGroup = () => {
    // New Group
    const [options, setOptions] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [inputValue, setInputValue] = useState('')

    // Update Existing Group
    const [updateValue, setUpdateValue] = useState('')
    const [updateOptions, setUpdatedOptions] = useState([])
    const [updatedItems, setUpdatedItems] = useState(new Set())

    const [selectedEMG, setSelectedEMG] = useState()
    const [showUpdatedInput, setShowUpdatedInput] = useState(false)

    const [emgGroups, setEmgGroups] = useState();
    const [isModalOpen, setModalOpen] = useState(false)
    const [chartData, setChartData] = useState(jsonData);


    const loadGroups = async () => {
        const response = await axios.get(`${url}`);
        const data = response.data;
        if (response.data.error) {
            setEmgGroups();
            return;
        }
        setEmgGroups(data.data)
        setSelectedEMG(data.data[0].id)
    }

    useEffect(() => {
        loadGroups()
    }, [])

    const handleSearch = async (value) => {
        setInputValue(value)

        if (value.length > 2) {
            try {
                const response = await axios.get(`${url}?term=${value}`)
                const suggestions = response.data.map(emg => emg.label)
                setOptions(suggestions.map(suggestion => ({ value: suggestion.formatted })))
            } catch (error) {
                console.error(`Error fetching data: ${error}`)
            }
        }
    }

    const handleUpdateSearch = async (value) => {
        setUpdateValue(value)
        if (value.length > 2) {
            try {
                const response = await axios.get(`${url}?term=${value}`)
                const suggestions = response.data.map(emg => emg.label)
                setUpdatedOptions(suggestions.map(sug => ({ value: sug.formatted })))
            } catch (error) {
                console.error(`Error fetching data: ${error}`)
            }
        }
    }


    const handleSelect = (value) => {
        const newSelectedItems = new Set(selectedItems);
        newSelectedItems.add(value);
        setSelectedItems(newSelectedItems);
        setInputValue('');
        setOptions([]);
    };

    const handleUpdateSelect = (value) => {
        const newUpdatedItems = new Set(updatedItems);
        newUpdatedItems.add(value);
        setUpdatedItems(newUpdatedItems);
        setUpdateValue('');
        setUpdatedOptions([]);
    }


    const addGroup = async () => {
        try {
            const response = await axios.post(`${urlLocal}/add`, {
                add: Array.from(selectedItems).toString()
            })

            setOptions([])
            setSelectedItems(new Set())
            setInputValue('')
        } catch (error) {
            console.log(error);
        }
        loadGroups();
    }

    const updateGroup = async () => {
        if (setUpdatedItems.size == 0) return;
        try {
            const response = await axios.post(`${urlLocal}/update`, {
                update: selectedEMG,
                emgGroup: Array.from(updatedItems).toString()
            })

            setUpdateValue('')
            setUpdatedOptions([])
            setUpdatedItems(new Set())
            setShowUpdatedInput(false)
        } catch (error) {
            console.log(error)
        }
        loadGroups();
    }



    const deleteGroup = async () => {
        try {
            const response = await axios.post(`${urlLocal}/delete`, {
                delete: selectedEMG
            });

            if (response.data.message) {
                console.log(response.data.message)
            } else {
                console.log(response.data.error)
            }

            console.log(selectedEMG)

            loadGroups();

        } catch (error) {
            console.log(error)
        }
    }

    const handleEmgChange = value => {
        setShowUpdatedInput(false)
        setUpdateValue('')
        setUpdatedOptions([])
        setUpdatedItems(new Set())
        setSelectedEMG(value);
    }



    const handleFilterOption = (input, option) => {
        return option.label.toLowerCase().includes(input.toLowerCase());
    }

    const removeChip = event => {
        if (!event.target.closest(".chip")) return;
        setSelectedItems(prevItems => {
            const newItems = new Set(prevItems);
            newItems.delete(event.target.closest(".chip").textContent);
            return newItems;
        });
    }

    const removeUpdateChip = event => {
        if (!event.target.closest(".chip")) return;
        setUpdatedItems(prevItems => {
            const newItems = new Set(prevItems);
            newItems.delete(event.target.closest(".chip").textContent);
            return newItems;
        });
    }


    return (
        <>
            <div className="header-container px-30 py-30 flex items-center">
                <svg width="224" height="40" viewBox="0 0 224 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58028 6.35993C7.15197 5.60038 9.59371 4.733 12.4126 4.733C21.2934 4.733 28.7956 12.2438 31.4374 18.8776C32.1868 18.0446 33.6072 15.4966 33.6072 11.5186C33.6072 5.8305 28.2823 0.525391 19.4594 0.525391C13.8823 0.525391 8.99293 2.88989 5.58028 6.35993ZM4.20654 27.0858C4.20654 29.9009 5.07338 32.3448 5.83347 33.9164C2.36396 30.5043 0 25.6133 0 20.0384C0 11.2128 5.30564 5.8895 10.9932 5.8895C14.9702 5.8895 17.5187 7.30885 18.3538 8.05928C11.7184 10.7006 4.20654 18.2012 4.20654 27.0858ZM26.5582 35.2886C29.3766 35.2886 31.8188 34.4234 33.39 33.6616C29.9773 37.129 25.0879 39.4946 19.5103 39.4946C10.688 39.4946 5.36411 34.1911 5.36411 28.5008C5.36411 24.5266 6.78345 21.9765 7.53282 21.1429C10.173 27.7761 17.6774 35.2886 26.5582 35.2886ZM27.9765 34.1321C33.6657 34.1321 38.9713 28.8082 38.9713 19.9853C38.9713 14.4077 36.6058 9.52047 33.1352 6.1046C33.8974 7.67521 34.7637 10.1191 34.7637 12.9369C34.7637 21.8193 27.2513 29.321 20.617 31.9639C21.4522 32.7117 23.9996 34.1321 27.9765 34.1321ZM222.45 31.4174L221.492 33.9208H221.477L220.508 31.4174H219.795V34.675H220.237V31.9544H220.248L221.32 34.675H221.617L222.693 31.9544H222.704V34.675H223.158V31.4174H222.45ZM217.768 34.6758H218.222V31.8205H219.271V31.4182H216.723V31.8205H217.768V34.6758ZM200.019 12.7767C200.019 10.4567 202.221 9.46436 204.678 9.46436C207.753 9.46436 210.176 10.4179 210.902 10.7033C210.953 10.7235 210.996 10.7404 211.03 10.7534V5.85056L210.976 5.83364C210.446 5.66884 208.2 4.96977 204.177 4.96977C197.767 4.96977 194.323 8.75362 194.323 13.069C194.323 17.3737 197.817 19.5929 200.726 21.1415L201.532 21.5706C201.98 21.8094 202.437 22.0526 202.828 22.261C205.238 23.5435 207.009 24.552 207.009 26.7813C207.009 29.3169 204.56 30.518 202.114 30.518C198.128 30.518 195.638 29.1297 195.042 28.7972C195.013 28.781 194.988 28.7673 194.968 28.7564L193.553 33.0911C193.968 33.3389 197.299 35.0399 202.212 35.0399C208.22 35.0399 212.707 31.5194 212.707 26.313C212.707 22.6172 210.193 20.2752 206.058 18.0748C205.601 17.8318 205.215 17.6259 204.821 17.4158L204.813 17.4117L204.106 17.0347C201.805 15.8096 200.019 14.844 200.019 12.7767ZM168.244 5.34504H177.079C185.174 5.34504 187.701 10.3691 187.701 14.2865C187.701 19.7799 183.542 21.8815 182.342 22.33V22.5161C182.916 22.6818 184.145 23.2606 185.737 26.1208L190.587 34.6744H184.583L180.394 27.2633C178.708 24.2337 178.024 23.2531 175.326 23.2531H173.454V34.6744H168.244V5.34504ZM176.942 18.8867C181.428 18.8867 182.354 16.0824 182.354 14.2554C182.354 12.6955 181.55 9.71089 176.942 9.71089H173.454V18.8867H176.942ZM142.617 5.34499V34.6743H160.715V30.3144H147.956V21.9013H159.201V17.5398H147.956V9.70655H159.248L160.67 5.34499H142.617ZM124.412 23.0835L125.795 18.8475H134.163H134.165V32.6847C131.545 34.0193 128.247 35.0449 124.232 35.0449C114.802 35.0449 109.759 28.8542 109.759 20.4336C109.759 11.5249 115.458 4.97696 124.418 4.97696C127.554 4.97696 130.616 5.75154 132.922 6.95417L131.457 11.4568C129.495 10.2241 127.138 9.47637 124.812 9.47637C118.469 9.47637 115.347 13.8412 115.347 20.0748C115.347 26.4028 118.426 30.5466 124.626 30.5466C126.545 30.5466 127.747 30.1883 128.882 29.6545V23.0835H124.412ZM90.9154 4.97691C82.402 4.97691 77.2257 11.1226 77.2257 20.0334C77.2257 29.0317 82.4465 35.0449 90.9154 35.0449C99.2963 35.0449 104.606 29.0317 104.606 20.0334C104.606 11.1687 99.4293 4.97691 90.9154 4.97691ZM90.9154 9.47579C96.3707 9.47579 99.0163 13.5278 99.0163 20.0334C99.0163 26.6699 96.1996 30.5465 90.9154 30.5465C85.5883 30.5465 82.8135 26.6699 82.8135 20.0334C82.8135 13.3519 85.5883 9.47579 90.9154 9.47579ZM52.5683 5.35314H61.4062C69.5012 5.35314 72.0277 10.3772 72.0277 14.2946C72.0277 19.788 67.8684 21.8896 66.6684 22.3381V22.5242C67.2424 22.6899 68.4702 23.2687 70.0618 26.1289L74.9125 34.6825H68.9101L64.7207 27.2714C63.0348 24.2418 62.3503 23.2612 59.6533 23.2612H57.7806V34.6825H52.5683V5.35314ZM61.2689 18.8948C65.7549 18.8948 66.6802 16.0905 66.6802 14.2635C66.6802 12.7036 65.8762 9.71899 61.2689 9.71899H57.7806V18.8948H61.2689Z" fill="#DA291C" />
                </svg>
                <h1 className='text-center w-full text-3xl font-medium leading-none tracking-wider text-m-red-500'>TTC Chart</h1>
            </div>
            <button onClick={() => setModalOpen(true)}>Open Modal</button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <div className="emg-group-wrapper">
                    <div className="emg-groups">
                        {
                            emgGroups ? (
                                <div className="emg-container">
                                    <h3>EMG Groups</h3>
                                    <Select
                                        showSearch
                                        filterOption={handleFilterOption}
                                        value={selectedEmg}
                                        onChange={handleEmgChange}
                                        options={emgGroups.map(item => ({
                                            label: item.emgGroup,
                                            value: item.id
                                        }))}
                                        style={{ width: 320 }}
                                    />
                                    <button onClick={() => setShowUpdatedInput(!showUpdatedInput)}>Update</button>
                                    <button onClick={deleteGroup}>Delete Group</button>

                                    {
                                        showUpdatedInput && (
                                            <div className="update-emg">
                                                <AutoComplete
                                                    options={updateOptions}
                                                    onSelect={handleUpdateSelect}
                                                    onSearch={handleUpdateSearch}
                                                    value={updateValue}
                                                    style={{ width: 350 }}
                                                />
                                                <button onClick={updateGroup}>Update Group</button>

                                                <div className="emg-chip-container" onClick={removeUpdateChip}>
                                                    {
                                                        updatedItems && (
                                                            Array.from(updatedItems).map((item, index) => (
                                                                <div className="chip" key={index}>{item}</div>
                                                            ))
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <h3>EMG groups is empty</h3>
                            )
                        }
                    </div>
                    <div className="new-emg-group">
                        <h3>Add new EMG group</h3>
                        <AutoComplete
                            className="autocomplete"
                            style={{ width: 350 }}
                            onSearch={handleSearch}
                            options={options}
                            onSelect={handleSelect}
                            value={inputValue}
                        />
                        <button onClick={addGroup}>Add EMG Group</button>
                        <div className="emg-chip-container" onClick={removeChip}>
                            {
                                selectedItems && (
                                    Array.from(selectedItems).map((item, index) => (
                                        <div className="chip" key={index}>{item}</div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </Modal>


            {
                chartData && (
                    <div className="chart-content h-full flex flex-row flex-grow">
                        <ChartTabs>
                            <Tab title="TTC Charts">
                                <ControlledCharts data={jsonData} />
                            </Tab>
                            <Tab title="Custom Charts">
                                <CustomChart data={jsonData} />
                            </Tab>
                        </ChartTabs>
                    </div>
                )
            }
        </>
    )
}



export default EMGGroup;
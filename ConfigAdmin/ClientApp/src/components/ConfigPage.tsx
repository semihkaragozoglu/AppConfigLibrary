import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as ConfigurationsStore from '../store/Configurations';
import ConfigModal from '../components/ConfigModalForm';

// At runtime, Redux will merge together...
type ConfigurationsProps =
    ConfigurationsStore.ConfigurationsState // ... state we've requested from the Redux store
    & typeof ConfigurationsStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ currentPageNumber?: string, keyword?: string }>; // ... plus incoming routing parameters


class ConfigPage extends React.PureComponent<ConfigurationsProps, { modal: boolean, actionType: string, id, type, name, value, applicationName, isActive }> {
    // This method is called when the component is first added to the document

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            actionType: "",
            id: 0, type: "", name: "", value: "", applicationName: "", isActive: false
        };
        this.openEditItemModal = this.openEditItemModal.bind(this);
        this.openDeleteItemModal = this.openDeleteItemModal.bind(this);
        this.openAddNewItemModal = this.openAddNewItemModal.bind(this);
        this.ensureDataFetched = this.ensureDataFetched.bind(this); 
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({
            ...this.state,
            modal: false,
            actionType: "",
        });
    }
    openEditItemModal(id) {
        const selected = this.props.configurations.filter(x => x.id === id)[0];
        this.setState({
            ...this.state,
            modal: true,
            actionType: "EDIT_ITEM",
            ...selected
        });
    }
    openDeleteItemModal(id) {
        const selected = this.props.configurations.filter(x => x.id === id)[0];
        this.setState({
            ...this.state,
            modal: true,
            actionType: "DELETE_ITEM",
            ...selected
        });
    }
    openAddNewItemModal() {
        this.setState({
            ...this.state,
            modal: true,
            actionType: "ADD_NEW_ITEM",
        });
    }


    public componentDidMount() {
        this.ensureDataFetched(false);
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        this.ensureDataFetched(false);
    }

    public render() {
        const { modal, actionType, id, type, name, value, applicationName, isActive } = this.state

        return (
            <React.Fragment>
                <h1 id="tabelLabel">Configuration List</h1> 
                {this.renderTable()}
                {this.renderPagination()}
                <ConfigModal ensureDataFetched={this.ensureDataFetched} closeModal={this.closeModal} modal={modal} actionType={actionType} id={id} type={type} name={name} value={value} applicationName={applicationName} isActive={isActive} />
            </React.Fragment>
        );
    }

    public ensureDataFetched(force) {
        //const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        var query = new URLSearchParams(this.props.location.search);
        var keyword = query.get("keyword");
        keyword = keyword === null ? "" : keyword;
        const currentPageNumber = query.get("currentPageNumber");
        const page = ((currentPageNumber && parseInt(currentPageNumber) >= 1) ? parseInt(currentPageNumber) : 1);
        this.props.requestConfigurations(keyword, page, force);
    }

    private renderTable() {
        return (
            <>
                <button className='btn btn-success' onClick={this.openAddNewItemModal}>Add New Item</button>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Application Name</th>
                            <th>ID</th>
                            <th>Is Active</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>
                                Actions
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.configurations && this.props.configurations.map((configuration: ConfigurationsStore.Configurations) =>
                            <tr key={configuration.id}>
                                <td>{configuration.applicationName}</td>
                                <td>{configuration.id}</td>
                                <td>{configuration.isActive ? 'True' : 'False'}</td>
                                <td>{configuration.name}</td>
                                <td>{configuration.type}</td>
                                <td>{configuration.value}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => this.openEditItemModal(configuration.id)}>Edit </button>
                                    <button className='btn btn-danger ml-1' onClick={() => this.openDeleteItemModal(configuration.id)}>Delete </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </>
        );
    }

    private renderPagination() {
        var query = new URLSearchParams(this.props.location.search);
        const keyword = query.get("keyword") ? query.get("keyword") : "";
        const currentPageNumber = query.get("currentPageNumber");
        const page = (currentPageNumber ? parseInt(currentPageNumber) : 1);
        const prevPage = page - 1;
        const nextPage = page + 1;
        return (
            <div className="d-flex justify-content-between">
                {
                    prevPage < 1 ?
                        <Link className='btn btn-outline-secondary btn-sm disabled' to={`/config-data?currentPageNumber=${prevPage}&keyword=${keyword}`}>Previous</Link>
                        :
                        <Link className='btn btn-outline-secondary btn-sm' to={`/config-data?currentPageNumber=${prevPage}&keyword=${keyword}`}>Previous</Link>
                }

                {this.props.isLoading && <span>Loading...</span>}
                <Link className='btn btn-outline-secondary btn-sm' to={`/config-data?currentPageNumber=${nextPage}&keyword=${keyword}`}>Next</Link>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.configurations, // Selects which state properties are merged into the component's props
    ConfigurationsStore.actionCreators // Selects which action creators are merged into the component's props
)(ConfigPage as any);

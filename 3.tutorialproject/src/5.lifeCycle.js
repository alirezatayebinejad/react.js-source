//LifeCycle is all cycles of components life: mounting(when created) - updating - unmounting(when component is deleted)
//watch this img: https://images.viblo.asia/2ceca49d-97fe-481a-8a1f-938532e75ee9.png

//mounting: 1.constructor() 2.getDerivedStateFromProps(props,state) 3.all render completed 4.componentDidMount
/*updating: when new props or setState() => 1.getDerivedStateFromProps() => 2.shouldComponentUpdate(props,state) 
=> 3. if 2 return true => render() =>4.getSnapshotBeforUpdate() return data => 5.componentDidUpdate(props,state,data) */
//note: instead of custom writing shouldConponentUpdate we can extend the class from React.PureComponent instead of React.Component so it auto decide whether to render or not
//unmounting: 1.componentWillUnmount()
class app extends Component {
	constructor(props) {
		super(props);
		console.log("constructor");
	}
	static getDerivedStateFromProps(props, state) {
		console.log("getDerive");
	}
	componentDidMount() {
		console.log("didmount");
		//good for api
	}
	shouldComponentUpdate() {
		console.log("shouldComponentUpdate");

		return true; //if we dont return render is not applied
	}
	getSnapshotBeforUpdate() {
		//work with what component was like befor updata
		return "data";
	}
	componentDidUpdate(props, state, data) {
		//after all update
	}
	componentWillUnmount() {
		//when component is deleted
	}
	render() {
		return <div>app</div>;
	}
}

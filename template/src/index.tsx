import { h } from 'preact';
import { Text } from 'preact-i18n';
import { SLUG } from './constants';
import { withIntl } from './enhancers';
import createApp from './components/app';

const Zimlet = (context) => {
    const { plugins, components } = context;
    const App = createApp(context);

	const exports = {
        init: () => {
            plugins.register('slot::menu', MenuItem);
            plugins.register('slot::routes', Router);
        }
    };

	// Register a new route with the preact-router instance
	function Router() {
		return [
			<App path={`/${SLUG}`} />
		];
	}

	// Create a main nav menu item
	const MenuItem = withIntl(() => (
		<components.MenuItem
			responsive
			icon="fa:code"
			href={`/${SLUG}`}
		>
			<Text id="{{name}}.menuItem" />
		</components.MenuItem>
	));

	return exports;
}

export default Zimlet;

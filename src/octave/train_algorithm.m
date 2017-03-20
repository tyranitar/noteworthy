function train_algorithm()
    % TODO: Try tweaking these.
    max_iter = 250;
    lambda = 0.1;

    more off;

    addpath('vendor/neural_net');
    disp('training algorithm...');

    weights_dir = '../../data/weights/';

    wipe_dir(weights_dir); % Delete existing weights.

    % Setup.

    [X, y] = get_shuffled_examples();
    m = size(X, 1);

    input_layer_size = size(X, 2);
    num_labels = size(y, 2);

    % TODO: try tweaking this value as well.
    hidden_layer_size = round(sqrt(input_layer_size * num_labels));

    % Initialize weights.
    initial_Theta1 = rand_init_weights(input_layer_size, hidden_layer_size);
    initial_Theta2 = rand_init_weights(hidden_layer_size, num_labels);

    % Unroll params.
    initial_nn_params = [initial_Theta1(:); initial_Theta2(:)];

    options = optimset('MaxIter', max_iter);

    cost_func = @(p) nn_cost_func(p, ...
        input_layer_size, ...
        hidden_layer_size, ...
        num_labels, ...
        X, y, lambda);

    % Train algorithm.
    [nn_params, cost] = fmincg(cost_func, initial_nn_params, options);

    Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
        hidden_layer_size, (input_layer_size + 1));

    Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
        num_labels, (hidden_layer_size + 1));

    Theta1_path = strcat(weights_dir, 'theta_1.m');
    Theta2_path = strcat(weights_dir, 'theta_2.m');

    dlmwrite(Theta1_path, Theta1);
    dlmwrite(Theta2_path, Theta2);

    % Find training set accuracy.
    pred = predict(Theta1, Theta2, X);

    % Debug.
    % disp(pred(1:5, :));
    % disp(y(1:5, :));

    disp('finished training algorithm');
end
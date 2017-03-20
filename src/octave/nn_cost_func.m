function [J, grad] = nn_cost_func(nn_params, ...
    input_layer_size, ...
    hidden_layer_size, ...
    num_labels, ...
    X, ...
    y, ...
    lambda)

    % TODO: Try multiple hidden layers.
    % y is already a set of binary vectors.

    % Setup.

    Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
        hidden_layer_size, (input_layer_size + 1));

    Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
        num_labels, (hidden_layer_size + 1));

    m = size(X, 1);

    % Calculation.

    a1 = [ones(m, 1), X]; % Input layer with bias.
    z2 = a1 * Theta1';
    a2 = [ones(m, 1), sigmoid(z2)];
    z3 = a2 * Theta2';
    a3 = sigmoid(z3);
    h = a3; % Hypothesis; aliasing for clarity.

    % Need to sum twice since 2-D matrix.
    J = (-1 / m) * sum(sum(y .* log(h) + (1 - y) .* log(1 - h)));

    % Regularization.
    J += (lambda / (2 * m)) * (sum(sum(Theta1(:, 2:end) .^ 2)) + sum(sum(Theta2(:, 2:end) .^ 2)));

    % Backprop.
    delta3 = h - y;
    delta2 = (delta3 * Theta2(:, 2:end)) .* sigmoid_grad(z2);

    Theta1_grad = (1 / m) * (delta2' * a1);
    Theta2_grad = (1 / m) * (delta3' * a2);

    % Regularization.
    Theta1_grad += (lambda / m) * [zeros(hidden_layer_size, 1), Theta1(:, 2:end)];
    Theta2_grad += (lambda / m) * [zeros(num_labels, 1), Theta2(:, 2:end)];

    % Unroll gradients.
    grad = [Theta1_grad(:) ; Theta2_grad(:)];
end
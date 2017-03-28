function p = predict(Theta1, Theta2, X)
    % Only predictions with a probability > thresh will be returned.
    % TODO: Try tweaking this.
    thresh = 0.5;

    m = size(X, 1);
    num_labels = size(Theta2, 1);

    h1 = sigmoid([ones(m, 1) X] * Theta1');
    h2 = sigmoid([ones(m, 1) h1] * Theta2');

    [max_vec, max_idx_vec] = max(h2, [], 2);
    p = (h2 > thresh) | eye(num_labels)(max_idx_vec, :);
end
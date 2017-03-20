function test_algorithm()
    more off;

    [X, y] = get_shuffled_examples(false);
    [Theta1, Theta2] = load_weights();

    p = predict(Theta1, Theta2, X);
    accuracy = compare_p_y(p, y);
    printf('test set accuracy: %d%%\n', accuracy * 100);
end
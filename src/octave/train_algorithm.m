function train_algorithm()
    more off;

    disp('training algorithm...');

    weights_path = strcat(data_dir, 'weights/index.mat');

    if exist(weights_path, 'file')
        unlink(weights_path); % Delete existing weights.
    end

    [X, y] = get_shuffled_examples();

    % Initialize weights here.

    disp('finished training algorithm');
end